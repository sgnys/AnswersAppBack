import {pool} from "../utils/db"
import {TemplateRecord} from "../records/template.record";

afterAll(async () => {
    await pool.end()
})

test('testing asynchronous code', async () => {
    const templates = await TemplateRecord.getAll();

    expect(templates).toBeDefined();
})

test('TemplateRecord.getOne returns data from database for one entry', async () => {
    const template = await TemplateRecord.getOne('f7a9eba4-9704-11ec-b0c8-309c23e04364');

    expect(template).toBeDefined();
    expect(template.id).toBe('f7a9eba4-9704-11ec-b0c8-309c23e04364');

})

test('TemplateRecord.getOne returns null from database for not existing entry', async () => {

    const template = await TemplateRecord.getOne('---');

    expect(template).toBeNull();
})

test('TemplateRecord.getAll returns array of found entries', async () => {

    const templates = await TemplateRecord.getAll();

    expect(templates).not.toBe([]);
    expect(templates[0].id).toBeDefined();
})

