export interface ISearchProgram {
  facultyId: number | null;
  campusId: number | null;
  levelFormation: number | null;
  modalityId: number | null;
}

export interface IDPrograms {
  credits: number;
  duration: string;
  idProgram: number;
  modalityList: string;
  name: string;
  schedule: string;
  sinies: string;
}

export interface IMyProgramCourse {
  coreId: number;
  coreName: string;
  credits: number;
  name: string;
  period: string;
  qalification: number;
  subjectId: number;
}

export interface IAreaColor {
  name: string;
  color: string;
  colorBody: string;
}

export interface IDataMyProgress {
  programName: string;
  code: string;
  email: string;
  doneCredits: number;
  totalCredits: number;
  totalProgress: number;
}

export interface IGender {
  fem: number;
  masc: number;
}

export interface PieSlice {
  label: string;
  value: number;
  percent: number;
  color: string;
}
