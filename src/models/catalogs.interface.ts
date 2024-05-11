/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CatalogsResponse {
  idCatalog: number;
  name: string;
  description: string;
  createdAt: string;
  catalogType: string;
  enabled: boolean;
  items: number;
  createdBy: string;
  catalogName: string;
}

export interface CatalogsByIdResponse {
  catalogItemId: number;
  catalogItemName: string;
  catalogItemDescription: string;
  enabled: string;
  catalogId: number;
  createdAt: string;
  order: number | null;
}

export interface CreateCatalog {
  catalogType: number | null;
  description: string;
  name: string;
}

export interface ICatalogItem {
  catalogItemId: number;
  catalogItemName: string;
  catalogItemDescription: string;
  enabled: string;
  catalogId: number;
  createdAt: string;
  value: boolean | null;
}

export interface ICatalogFilter {
  keyWord: string | null;
}

export interface ICreateCatalogItem {
  catalogId: number | null;
  description: string | null;
  name: string;
  order: number | null;
}

export interface FileLoadOptions {
  event: any;
  allowedExtension: string;
  convertToBase64: (param: any) => void;
}
