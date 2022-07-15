import {FieldPacket, OkPacket} from "mysql2";
import {v4 as uuid} from "uuid";
import {AnswerEntity, AnswerGroupEnum} from "../types";
import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";

type AnswerRecordResults = [AnswerRecord[], FieldPacket[]];

export class AnswerRecord implements AnswerEntity {
    public id?: string;
    public text: string;
    public category: string;
    public createdAt: Date;
    public modifiedAt?: Date | null;
    public copyBtnCount = 0;
    public templateId: string | null;

    constructor(obj: AnswerEntity) {
        const {id, text, category, createdAt, modifiedAt, copyBtnCount, templateId} = obj

        if (text.length < 3 || text.length > 3000) {
            throw new ValidationError('Długość wpisywanego tekstu musi zawierać się w przedziale od 3 do 3000 znaków.');
        }

        if(!(category === AnswerGroupEnum.IT || category === AnswerGroupEnum.TELCO || category === AnswerGroupEnum.PREPAID || category === AnswerGroupEnum.OTHER || category === AnswerGroupEnum.MOST_COPIED)){
            throw new ValidationError('Nie została zaznaczona kategoria odpowiedzi.')
        }


        this.id = id;
        this.text = text;
        this.category = category;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.copyBtnCount = copyBtnCount;
        this.templateId = templateId;
    }

    static async getAll(): Promise<AnswerRecord[]> {
        const [results] = await pool.execute('SELECT * FROM `answers` ORDER BY `createdAt` DESC',
        ) as AnswerRecordResults;
        // !results.length? [] :
        return results.map(obj => new AnswerRecord(obj));
    }

    static async getAllSortedByCategory(category: string): Promise<AnswerRecord[]> {

        if (category === AnswerGroupEnum.MOST_COPIED) {
            const [results] = await pool.execute('SELECT * FROM `answers` ORDER BY `copyBtnCount` DESC',
            ) as AnswerRecordResults;

            return results.map(obj => new AnswerRecord(obj));
        } else {
            const [results] = await pool.execute('SELECT * FROM `answers` WHERE `category` = :category ORDER BY `createdAt` DESC', {
                category
            }) as AnswerRecordResults;

            return results.map(obj => new AnswerRecord(obj));
        }

    }

    static async getOne(id: string): Promise<AnswerRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `answers` WHERE `id` = :id", {
            id
        }) as AnswerRecordResults;

        return results.length === 0 ? null : new AnswerRecord(results[0]);
    }

    async insert(): Promise<string> {
        this.id = this.id ?? uuid();

        await pool.execute('INSERT INTO `answers`(`id`, `text`, `category`, `templateId`) VALUES(:id, :text, :category, :templateId )', {
            id: this.id,
            text: this.text,
            category: this.category,
            templateId: this.templateId,
        })

        return this.id
    }

    async update(): Promise<void> {
        this.modifiedAt = new Date();
        await pool.execute('UPDATE `answers` SET `modifiedAt` = :modifiedAt, `templateId` = :templateId, `text` =:text, `category` = :category WHERE  `id` = :id', {
            modifiedAt: this.modifiedAt,
            templateId: this.templateId,
            text: this.text,
            category: this.category,
            id: this.id,
        })
    }

    async updateCount(): Promise<void> {
        await pool.execute('UPDATE `answers` SET `copyBtnCount` = `copyBtnCount` + 1 WHERE  `id` = :id', {
            id: this.id,
            copyBtnCount: this.copyBtnCount,
        })
    }

    static async delete(id: string): Promise<void> {
        const {affectedRows} = (await pool.execute('DELETE FROM `answers` WHERE `id` = :id', {
            id,
        }))[0] as OkPacket
    }
}



