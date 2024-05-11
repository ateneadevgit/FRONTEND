export interface Program {
  facultyId?: number;
  idProgram: number;
  idTypeFormation?: number;
  name: string;
}

export interface ContentProgram {
  idProgram: number;
  name: string;
  logo: string;
  cover: string;
  developmentDate: string;
  idFaculty: number;
  nameFaculty?: string | null;
  idTypeFormation: number;
  idLevelFormation: number;
  nameLevelFormation?: string | null;
  idRegistryType: number;
  fileUrl: string;
  createdAt: string;
  campusList: string;
  nameCampusList?: string | null;
  modalityList: string;
}

export interface ProgramModule {
  moduleId: number;
  name: string;
  isEditable: boolean;
  type: number;
  isSelected?: boolean;
}

export interface ProgramHistorical {
  historyId: number;
  version: number;
  createdBy: string;
  editionDate: string;
  value: string;
  url?: string;
  minute?: string;
}

export interface UpgradeProgram {
  createdBy: string | null;
  hasApproval: boolean;
  minute: {
    fileContent: string;
    fileExtension: string;
  };
  modulesId: number[];
  roleId: number | null;
}

export interface EvaluateModulesEdit {
  approvedModules: number[];
  createdBy: string | null;
  evaluation: string;
  fileFeedback: {
    fileContent: string;
    fileExtension: string;
  };
  roleId: number | null;
}

export interface IModule {
  isEditable: boolean;
  moduleId: number;
  name: string;
  type: number | null;
  isSelected?: boolean;
  approved?: boolean;
  declined?: boolean;
}

export interface DataEditProgram {
  facultyId: number;
  campus: number[];
  levelFormation: number;
  requestDate: string;
  requestMinute: string;
  responseMinute: string;
  selectedModules: IModule[];
}

export interface ModulesEditApprove {
  modules: IEditModule[];
  renovationId: number;
}

export interface IEditModule {
  name: string;
  status: number;
  moduleId: number;
  moduleType: number;
  nameStatus?: string;
  hasEvaluation: boolean;
}

export interface IObjectTemp {
  createdBy: string | null;
  moduleId: number;
  object?: string;
  programId?: number;
  roleId: number | null;
  evaluation?: string;
}

export interface IObjectJson {
  objectTempId: number;
  value: string;
}

export interface ReplyEditModule {
  summary: string;
  curriculumType: number;
  roleId: number | null;
  createdBy: string | null;
  stepId: number | null;
  workflowId: number | null;
}

export interface IDataSummary {
  curriculumSummaryId: number;
  curriculumSummary: string;
}

export interface IProgramTechnicalTecnological {
  name: string;
  menEndDate: string | null;
  idProgram: number;
  campusList: string;
  idLevelFormation: number;
}

export interface IObjCreditsAcademic {
  creditNumber: number;
  isUpdated: boolean;
  name: string;
  semester: number;
  subjectId: number;
}

export interface IObjCurricularComponentRequest {
  componentCurricular: string;
  componentType: number;
}
export interface IAttachmentGuideline {
  programAttachmentId: number;
  name: string;
  fileUrl: string;
  fileType: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  attachmentFatherId: number;
}

export interface IAttachmentMinutes {
  fileDate: Date | string | null;
  fileName: string | null;
}

export interface IAttachmentCreate {
  createdBy: string | null;
  fatherId: number;
  file: {
    fileContent: string;
    fileExtension: string;
  };
  fileName: string;
  fileOrder: number | null;
  fileType: number;
}

export interface IFileType {
  fileContent: string;
  fileExtension: string;
}

export interface IEvenGeneral {
  createdBy: string | null;
  endDate: string;
  endHour: string;
  eventType: number;
  eventUrl: string;
  facultyId: number | null;
  feedback: string;
  isAllDay: boolean;
  programId: number | null;
  repetition: number;
  roleId: number | null;
  startDate: string;
  startHour: string;
  tittle: string;
  userId: string | null;
}

export interface IFilterEvent {
  createdBy: string | null;
  endDate: string;
  facultyId: number | null;
  filter: {
    facultyId: number | null;
    programId: number | null;
    types: number[];
  };
  programId: number[] | null;
  roleId: number | null;
  startDate: string;
}

export interface IEventList {
  tittle: string;
  start: string;
  end: string;
  type: number;
  allDay: boolean;
  meta: {
    feedback: string;
    eventUrl: string;
    startDate: string;
    endDate: string;
    startHour: string;
    repetition: number | null;
    endHour: string;
    eventType: number;
    facultyId: number | null;
    programId: number | null;
    roleId: number | null;
    isAllDay: boolean;
    canEdit: boolean;
    isPersonal: boolean;
    createdBy: string | null;
    roleType: number | null;
    eventId: number | null;
  };
}

export interface SecondLanguageGroup {
  groupId: number;
  secondLanguages: SecondLanguage[];
}

export interface SecondLanguage {
  secondLanguageId: number;
  cover: string;
  tittle: string;
  startLevel: string;
  endLevel: string;
  groupId: number;
  icon: string;
  description: string;
  modalityId: number;
  duration: number;
  hours: number;
  inscriptionLink: string;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
}

export interface SecondLanguageRQ {
  cover: FileLoad | null;
  createdBy: string;
  description: string;
  duration: number;
  endLevel: string;
  groupId: number;
  hours: number;
  icon: FileLoad | null;
  inscriptionLink: string | null;
  modalityId: number;
  startLevel: string;
  tittle: string;
}

export interface FileLoad {
  fileContent: string;
  fileExtension: string;
}
