// type AnswersGroup = 'it' | 'telco' | 'prepaid' | 'other';

export interface AnswerEntity{
    id?: string;
    text: string;
    category: string;
    createdAt?: Date;
    modifiedAt?: Date | null;
    copyBtnCount?: number;
    templateId: string | null;
}