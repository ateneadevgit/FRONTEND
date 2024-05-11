import { FileContent } from './porpouse.interface';

export interface ISharedEportafolio {
  fileId: number;
  fileFormat: string;
  name: string;
  createdAt: Date;
  fileUrl: string;
  createdBy: string;
  isFavorite: boolean;
}

export interface IPaginationEportafolio {
  content: ISharedEportafolio[];
  numberOfPage: number;
  itemsPerPage: number;
  itemsOnThisPage: number;
  totalNumberPages: number;
  totalNumberItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ISearchEportafolio {
  endDate: string | null;
  formatType: number | null;
  keyWord: string | null;
  name: string | null;
  startDate: string | null;
}

export interface IAddFavorite {
  isFavorite: boolean;
}

export interface IFolder {
  folderId: number;
  name: string;
  icon: string;
  color: string;
}

export interface IFolderRequest {
  name: string;
  icon: string;
  color: string;
}

export interface IFileRequest {
  file: FileContent | null;
  fileSize: number | null;
  folderId: number;
  keyWord: string | null;
  name: string;
  privacity: number;
  sharedWith: string[];
  type: number;
  url: string | null;
}

export interface IEportafolioMenu {
  label: string;
  icon: string;
}

export interface IConsumedSpace {
  consumedPercentage: number;
  avaliable: number;
  consumed: number;
}

export interface IFileModel {
  type: number;
  name: string;
  url: string | null;
  file: string | null;
  fileSize: number | null;
  keyWord: string | null;
  privacity: number;
  folderId: number;
  facultyId: number | null;
  sharedWith: string[];
  createdBy: string;
}
