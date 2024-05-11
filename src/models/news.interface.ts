export interface INew {
  newId?: number;
  tittle?: string;
  cover?: string;
  cover2?: string;
  content?: string;
  images: string[];
  images2?: string[];
  campus: number[];
  createdAt?: string;
  createdBy?: string;
}

export interface IDocumentManager {
  documentBytes: string;
  documentExtension: string;
  documentVersion?: string;
  idUser?: string;
}
