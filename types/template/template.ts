import {TemplateEntity} from "./template.entity";

export interface GetSingleTemplateRes{
  template: TemplateEntity;
}

export interface ListTemplatesRes{
  templatesList: TemplateEntity[];
}
