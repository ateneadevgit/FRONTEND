export interface ISearchProblemList {
  problem: string | null;
  programId: number[] | null;
  roleId: number | null;
  semester: number | null;
}

export interface IProblemBank {
  problemBankId: number;
  semester: number;
  tittle: string;
  file: string;
  description: string;
  linkMoodle: string;
  enabled: boolean;
  program: string;
  statusId: number;
  subject: string;
  subjectId: number;
  competences: ICompetence[];
}

export interface ICreatedProblem {
  competences: number[];
  createdBy: string | null;
  curriculumId: number | null;
  description: string;
  file: {
    fileContent: string;
    fileExtension: string;
  } | null;
  linkMoodle: string;
  roleId: number | null;
  semester: number;
  tittle: string;
}

export interface IFeedbackProblem {
  createdBy: string | null;
  evaluation: string;
  feedback: string | null;
  fileFeedback: {
    fileContent: string;
    fileExtension: string;
  } | null;
  roleId: number | null;
}

export interface ICreatedCompetence {
  categoryId: number;
  code: string;
  competenceId: number | null;
  createdBy: string | null;
  description: string;
  roleId: number | null;
}

export interface ICompetence {
  competenceId: number;
  categoryId: number;
  categoryName?: string;
  start?: boolean;
  countCategory?: number;
  code: string;
  description: string;
  createdBy: null;
  roleId: null;
}
