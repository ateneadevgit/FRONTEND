export interface CurriculumItem {
  code: string | null;
  curriculumId: number;
  name: string;
}

export interface CurriculumCore {
  curriculumId: number;
  name: string;
  type: number;
  creditNumber: number;
  participation: number;
  description: string;
  raeg: string | null;
  fatherId: number;
  isUpdated: boolean;
}

export interface CurriculumSubject {
  curriculumId: number;
  name: string;
  type: number;
  creditNumber: number;
  participation: number;
  code: string | null;
  description: string;
  hoursInteractionTeacher: number | null;
  hourSelfWork: number | null;
  fatherId: number;
  isUpdated: boolean;
}

export interface CurriculumSaveJson {
  curriculumId: number;
  name: string;
  type: number;
  creditNumber: number;
  participation: number;
  code: string | null;
  description: string;
  hoursInteractionTeacher: number | null;
  hourSelfWork: number | null;
  raeg: string | null;
  fatherId: number;
  isUpdated: boolean;
}

export interface ILearningEvaluation {
  tittle: string;
  description: string | null;
  curriculumId: number;
}
