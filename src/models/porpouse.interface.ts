export interface Createporpouse {
  logo: FileContent | null;
  cover: FileContent | null;
  programFather?: number;
  programName: string;
  facultyId: number;
  formationTypeId: number;
  campus: number[];
  formationLevel: number;
  modality: number[];
  developmentDate: string;
  fileProposal: FileContent;
  isEnlarge: boolean;
  registryTypeId: number;
}

export interface FileContent {
  fileContent: string;
  fileExtension: string;
}

export interface Porpouses {
  content: ContentPorpouses[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsOnThisPage: number;
  itemsPerPage: number;
  numberOfPage: number;
  totalNumberItems: number;
  totalNumberPages: number;
}

export interface ContentPorpouses {
  idProgram: number;
  name: string;
  logo: string;
  idFaculty: number;
  idLevelFormation: number;
  fileUrl: string;
  createdAt: string;
  idStatus: number;
  campusList: number[];
}
