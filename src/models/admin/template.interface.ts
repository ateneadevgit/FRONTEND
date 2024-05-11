export interface ITemplate {
  templateId: number;
  templateName: string;
  description: string;
  emailBody: string;
  subject: string;
}

export interface ITemplateRequest {
  content: string;
  description: string | null;
  name: string;
  subject: string | null;
}
