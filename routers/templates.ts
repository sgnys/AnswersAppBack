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
        console.log(template);
        console.log(req.body)

        if (template === null) {
            throw new ValidationError('Nie znaleziono szablonu o podanym ID');
        }

        //TODO zrobić walidację jeżeli         template.firstParagraph === req.body.firstParagraph;
        // i                                   template.lastParagraph === req.body.lastParagraph;
        // to ValidationError "Nie dokonałeś żadnych zmian w szablonie, modyfikacja nie została wysłana na serwer"
        template.firstParagraph = req.body.firstParagraph;
        template.lastParagraph = req.body.lastParagraph
        await template.update();

        res.json({
            template,
        } as GetSingleTemplateRes)
    })


