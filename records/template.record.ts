
import {FieldPacket} from "mysql2";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {TemplateEntity} from "../types";

type TemplateRecordResults = [TemplateRecord[], FieldPacket[]];

export class TemplateRecord implements TemplateEntity{
    public id?: string;
    public name: string;
    public firstParagraph: string;
    public lastParagraph: string;

    constructor(obj: TemplateEntity) {

        const {id, firstParagraph, lastParagraph, name} = obj;

         if(firstParagraph.trim().length < 3 || firstParagraph.trim().length > 200){
             new ValidationError('Długość akapitu powitalnego  musi zawierać się w przedziale od 3 do 200 znaków.');
         }

        if(lastParagraph.trim().length < 3 || lastParagraph.trim().length > 300){
            new ValidationError('Długość akapitu końcowego  musi zawierać się w przedziale od 3 do 300 znaków.');
        }
        //TODO powyższe walidacje przenieść również na front

        if(name.trim().length < 2 || lastParagraph.trim().length > 20){
            new ValidationError('Długość nazwy szablonu  musi zawierać się w przedziale od 3 do 300 znaków.');
        }

        this.id = id;
        this.name =name;
        this.firstParagraph = firstParagraph;
        this.lastParagraph = lastParagraph;
    }

    static async getAll(): Promise<TemplateRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `templates`") as TemplateRecordResults;

        return results.map(obj => new TemplateRecord(obj));
    }

    static async getOne(id: string): Promise<TemplateRecord | null>{
        const [results] = await pool.execute("SELECT * FROM `templates` WHERE `id` = :id",{
            id
        }) as TemplateRecordResults;

        return results.length === 0? null: new TemplateRecord(results[0]);
    }

    async update(): Promise<void>{
      await pool.execute('UPDATE `templates` SET `firstParagraph` = :firstParagraph, `lastParagraph` = :lastParagraph WHERE `id` = :id', {
          id: this.id,
          firstParagraph: this.firstParagraph,
          lastParagraph: this.lastParagraph,
      })
    }

}