export interface PreloadDataSyllabus {
  programName: string;
  levelFormationId: number;
  facultyId: number;
  campus: number[];
  modalities: number[];
  credits: number;
}

export interface SyllabusData {
  enabled?: boolean;
  syllabusId?: number;
  createdAt?: string;
  updatedAt?: string;
  approvedDate: string;
  attendance: string;
  bibliographyBasic: string;
  bibliographyLenguaje: string;
  bibliographyWeb: string;
  cat: string;
  cine: string;
  code: string;
  content: string;
  createdBy: string | null;
  curriculumId: number;
  learningGeneral: string;
  learningSpecific: string;
  levelFormationCredits: number;
  levelFormationPrerequisites: string;
  modalityObservation: string;
  nbc: string;
  pedagogicalPractices: string;
  signatureType: number;
  signatureTypeObservation: string;
  stepId: number;
  subjectConformation: string;
  subjectContext: string;
  subjectDescription: string;
  workflowBaseId: number;
}
