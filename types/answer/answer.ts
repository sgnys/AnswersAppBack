import { TemplateEntity } from "../template";
import {AnswerEntity} from "./answer.entity";

export interface ListAnswersRes{
    answersList: AnswerEntity[];
    templatesList: TemplateEntity[];
}

export interface GetSingleAnswerRes{
    answer: AnswerEntity;
}

export type CreateAnswerReq = Omit<AnswerEntity, 'id' | 'createdAt' | 'modifiedAt' | 'copyBtnCount'>

export enum CustomerOrConsultant {
    CUSTOMER = 'customer',
    CONSULTANT = 'consultant',
}

export enum AnswerGroupEnum{
    IT= 'it',
    TELCO = 'telco',
    PREPAID = 'prepaid',
    OTHER = 'other',
}





