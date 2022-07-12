import {Router} from "express";
import {TemplateRecord} from "../records/template.record";
import {ValidationError} from "../utils/errors";
import {GetSingleTemplateRes, ListTemplatesRes} from "../types";

export const templatesRouter = Router();

templatesRouter
    .get('/', async (req, res) => {
        const templatesList = await TemplateRecord.getAll();

        res.json({
            templatesList,
        } as ListTemplatesRes)
    })

    .get('/:id', async (req, res) => {

        const template = req.params.id === ""
            ? null
            : await TemplateRecord.getOne(req.params.id)

        if (!template) {
            throw new ValidationError("Nie ma szablonu o podanym ID")
        }

        res.json({
            template,
        } as GetSingleTemplateRes)
    })

    .put('/:id', async (req, res) => {
        const template = await TemplateRecord.getOne(req.params.id);

        if (template === null) {
            throw new ValidationError('Nie znaleziono szablonu o podanym ID');
        }

        if(template.firstParagraph === req.body.firstParagraph && template.lastParagraph === req.body.lastParagraph){
            throw new ValidationError('Nie dokonałeś żadnych zmian w szablonie, modyfikacja nie została wysłana na serwer')
        }

        template.firstParagraph = req.body.firstParagraph;
        template.lastParagraph = req.body.lastParagraph

        if(template.firstParagraph.length < 3 || template.firstParagraph.trim().length > 200){
            throw new ValidationError('Długość akapitu powitalnego  musi zawierać się w przedziale od 3 do 200 znaków.');
        }

        if(template.lastParagraph.trim().length < 3 || template.lastParagraph.trim().length > 300){
            throw new ValidationError('Długość akapitu końcowego  musi zawierać się w przedziale od 3 do 300 znaków.');
        }

        await template.update();
        console.log(template);
        res.json({
            template,
        } as GetSingleTemplateRes)
    })


