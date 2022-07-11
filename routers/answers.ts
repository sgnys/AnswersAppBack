import {Router} from "express";
import {AnswerRecord} from "../records/answer.record";
import {TemplateRecord} from "../records/template.record";
import {AnswerGroupEnum, GetSingleAnswerRes, ListAnswersRes} from "../types";
import {ValidationError} from "../utils/errors";

export const answersRouter = Router();

answersRouter
    .get('/', async (req, res) => {

        const answersList = await AnswerRecord.getAll();
        const templatesList = await TemplateRecord.getAll();

        res.json({
            answersList,
            templatesList,
        } as ListAnswersRes);
    })

    .get('/sort/:category', async (req, res) => {
        const {category} = req.params

        if (!(category === AnswerGroupEnum.IT || category === AnswerGroupEnum.TELCO || category === AnswerGroupEnum.PREPAID || category === AnswerGroupEnum.OTHER || category === AnswerGroupEnum.MOST_COPIED)) {
            throw new ValidationError('Nie została zaznaczona kategoria odpowiedzi.');
        }

        const answersList = await AnswerRecord.getAllSortedByCategory(req.params.category);
        const templatesList = await TemplateRecord.getAll();

        res.json({
            answersList,
            templatesList,
        } as ListAnswersRes)
    })

    .get('/:id', async (req, res) => {
        const answer = await AnswerRecord.getOne(req.params.id)

        res.json({
            answer,
        } as GetSingleAnswerRes);
    })

    .post('/', async (req, res) => {

        let answer
        let answerId;

        if (req.body.templateId === "") {
            const answerReq = {
                ...req.body,
                templateId: null,
            }
            answer = await new AnswerRecord(answerReq);
            answerId = await answer.insert();

        } else {
            answer = await new AnswerRecord(req.body);
            answerId = await answer.insert();
        }

        res.json({
            answer,
        } as GetSingleAnswerRes);
    })

    .put('/:id', async (req, res) => {

        const {templateId, text, category} = req.body

        const answer = await AnswerRecord.getOne(req.params.id);

        if (templateId === "") {
            answer.templateId = null
        } else {
            answer.templateId = templateId;
        }
        answer.text = text;
        answer.category = category;

        if (text.length < 3 || text.length > 3000) {
            throw new ValidationError('Długość wpisywanego tekstu musi zawierać się w przedziale od 3 do 300 znaków.');
        }

        await answer.update();

        res.json({
            answer,
        } as GetSingleAnswerRes);
    })

    .put('/count/:id', async (req, res) => {
        const answer = await AnswerRecord.getOne(req.params.id);
        console.log(answer)
        // answer.copyBtnCount = answer.copyBtnCount + 1;
        await answer.updateCount();
        res.end();
    })

    .delete('/:id', async (req, res) => {
        console.log(req.params.id)
        await AnswerRecord.delete(req.params.id)
        res.end();
    })



