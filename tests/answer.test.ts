import {pool} from "../utils/db"
import {AnswerRecord} from "../records/answer.record";

const defaultObject = {
    text: '[Test from JEST], testowa odpowiedź',
    category: 'it',
    templateId: 'f7a9eba4-9704-11ec-b0c8-309c23e04364',
}


afterAll(async () => {
    await pool.end()
})

test('testing asynchronous code', async () => {
    const answers = await AnswerRecord.getAll();

    expect(answers).toBeDefined();
})

test('AnswerRecord.getOne returns data from database for one entry', async () => {
    const answer = await AnswerRecord.getOne('51841ce4-36e2-465a-b091-0b83c6c47997');

    expect(answer).toBeDefined();
    expect(answer.id).toBe('51841ce4-36e2-465a-b091-0b83c6c47997');
    expect(answer.category).toBe('telco');
    expect(answer.templateId).toBe('f7a9eba4-9704-11ec-b0c8-309c23e04364');
})

test('AnswerRecord.getOne returns null from database for not existing entry', async () => {

    const answer = await AnswerRecord.getOne('---');

    expect(answer).toBeNull();
})

test('AnswerRecord.getAll returns array of found entries', async () => {

    const answers = await AnswerRecord.getAll();

    expect(answers).not.toBe([]);
    expect(answers[0].id).toBeDefined();
})

test('AnswerRecord.insert returns new UUID', async () => {
    const answer = new AnswerRecord({
        category: "other",
        templateId: "f7a9eba4-9704-11ec-b0c8-309c23e04364",
        text: "[Test from JEST], testowa odpowiedź"
    })

    await answer.insert();
    expect(answer.id).toBeDefined();
    expect(typeof answer.id).toBe('string');
    expect(answer.id).toMatch(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/);
})

test('AnswerRecord.insert inserts data to database', async () => {

    const answer = new AnswerRecord({
        category: "it",
        templateId: "f7a9eba4-9704-11ec-b0c8-309c23e04364",
        text: "[Test from JEST], testowa odpowiedź nr 2"
    })
    await answer.insert()

    const foundAnswer = await AnswerRecord.getOne(answer.id);

    expect(foundAnswer).toBeDefined();
    expect(foundAnswer).not.toBeNull();
    expect(foundAnswer.id).toEqual(answer.id);
})

test('Validates invalid length of text', ()=>{
    expect(()=> new AnswerRecord({
        ...defaultObject,
        text: '',
    })).toThrow('Długość wpisywanego tekstu musi zawierać się w przedziale od 3 do 3000 znaków.')
})

test('Validates invalid category', ()=>{
    expect(()=> new AnswerRecord({
        ...defaultObject,
        category: '',
    })).toThrow('Nie została zaznaczona kategoria odpowiedzi.')
})

test('Validates templateId, convert "" to null ', async()=>{

    const answer = new AnswerRecord({
        ...defaultObject,
        templateId: null,
    })

    const id = await answer.insert();

    const foundAnswer = await AnswerRecord.getOne(id);

    expect(foundAnswer.templateId).toBeNull();

})