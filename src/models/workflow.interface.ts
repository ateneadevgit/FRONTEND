/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileContent } from './porpouse.interface';
import { DirectorsRole } from './sinu.interface';

export interface EvaluatePorpouse {
  evaluation?: string;
  feedback?: string;
  fileFeedback?: FileContent;
  roleId?: null;
  createdBy?: null;
  fileProposal?: FileContent;
}

export interface Workflow {
  workflowBaseId: number;
  steps: StepsWorkflow[];
}

export interface StepsWorkflow {
  hasIcon?: boolean;
  isSmall?: boolean;
  icon?: string;
  stepId: number;
  stepName: string;
  orderId: number;
  isEditable: boolean;
  isSent: boolean;
  isDone: boolean;
  hasEvaluated: boolean;
  status: number;
  canCreateSummary: boolean;
  template: TempleteWorkflow[];
  attachment: Attachment[];
  actions: ActionsWorkflow[];
}

export interface ActionsWorkflow {
  actionId: number;
  actionName: string;
}

export interface Attachment {
  attachId: number;
  name: string;
  createdDate: Date;
  createdBy: string;
  urlFile: string;
  status: number;
  dcStatus: number;
  vaStatus: number;
  acStatus: number;
  version: string;
  enabled: boolean;
  isOriginal: boolean;
  attachmentChild: Attachment[];
  setstatus?: any;
  setdcStatus?: any;
  setvaStatus?: any;
  setacStatus?: any;
  isDeclined: boolean;
  isSent: boolean;
}

export interface TempleteWorkflow {
  templateName?: string;
  templateUrl?: string;
  description?: string;
  templateChild?: TempleteWorkflow[];
}

export interface CreateWorkflow {
  createdBy: null;
  roleId: null;
  userData: DirectorsRole;
  workflowObjectId: number;
  workflowType: string;
}

export interface LoadDocumentsWorkflow {
  attachments: AttachmentLoadDocumentsWorkflow[];
  createdBy: null;
  roleId: null;
  stepId: number;
  workflowId: number;
}

export interface AttachmentLoadDocumentsWorkflow {
  bytes: string;
  extension: string;
  fatherId: number | null;
  feedback: string;
  name: string;
  version: string;
}

export interface SendEvaluationWorkflow {
  attachment: number[];
  createdBy: string | null;
  roleId: number | null;
  stepId: number;
  workflowId: number;
}

export interface SendStepFeedback {
  campusId: number[] | null;
  createdBy: string | null;
  feedback: string | null;
  feedbackStatus: string;
  roleId: number | null;
  stepId: number;
  workflowId: number;
  isSummary: boolean;
}

export interface UpdateCurriculumRequests {
  createdBy: string | null;
  description: string;
  //fatherId: null | number;
  name: string;
  numberCredits: number;
  raeg: string | null;
  roleId: null;
  //stepId: number;
  subjectRequest: null | SubjectRequestWorkflow;
  //type: number;
}

export interface CurriculumRequests {
  createdBy: string | null;
  description: string;
  fatherId: null | number;
  name: string;
  numberCredits: number;
  raeg: string | null;
  roleId: null;
  stepId: number;
  subjectRequest: null | SubjectRequestWorkflow;
  type: number;
}

export interface ComponenteWorkflow {
  createdBy: string | null;
  curriculumRequests: CurriculumRequests[];
  roleId: null;
  stepId: number;
  workflowId: number;
}

export interface SubjectRequestWorkflow {
  code: string;
  hourSelfWork: number;
  hoursInteractionTeacher: number;
  semester: number;
}

export interface ReponseComponentCurriculum {
  curriculumId: number;
  name: string;
  type: number;
  description: string;
  percentageParticipation: number | null;
  coreModel: null;
  subjectRequest: SubjectRequestWorkflow;
  childs: ReponseComponentCurriculum[];
  numberCredits: number;
}

export interface SummaryWorkflow {
  createdBy: null;
  roleId: null;
  stepId: number;
  summary: string;
  workflowId: number;
}

export interface SubjectModel {
  creditNumber: number;
  name: string;
  semester: number;
  subjectId: number;
}

export interface SemesterModel {
  semesterRoman?: string;
  semesterNumber: number;
  subjectListModel?: SubjectModel[] | null;
}

export interface CoreAndSubcoreModel {
  curriculumId: number;
  name: string;
  type: number;
  creditNumber: number;
  participation: number;
  code: string;
  description: string;
  hoursInteractionTeacher: number;
  hourSelfWork: number;
  raeg: string;
  fatherId: number;
  isUpdated: boolean;
}

export interface ISubjectCurriculumNif {
  curriculumId: number;
  name: string;
  type: number;
  numberCredits: number;
  description: string;
  fatherId: number;
  raeg: string | null;
  subjectRequest: {
    semester: number;
    code: string;
    hoursInteractionTeacher: number;
    hourSelfWork: number;
  };
}

export interface IRsCurriculumNif {
  totalCredits: number;
  totalSubject: number;
  subjects: ISubjectCurriculumNif[];
}

export interface IActivityRequest {
  activityDate: Date;
  canUpdate: true;
  createdBy: string;
  enabled: true;
  previusActivities: string;
  result: string;
  roleId: number;
  session: number;
  strategies: string;
  subjectActivityId: number;
  syncActivities: string;
  topic: string;
  url: string;
}

export interface IIntegryActivities {
  activity: string;
  activityId: number;
  createdBy: string;
  description: string;
  tittle: string;
}

export interface IRQCurriculumNif {
  activities: IIntegryActivities[];
  competences: string;
  createdBy: string;
  rae: string;
  subjectGuide: {
    academicPeriod: string;
    activityRequestList: IActivityRequest[];
    approvedDate: string;
    attendance: string;
    bibliographyBasic: string;
    bibliographyLanguage: string;
    bibliographyWeb: string;
    campusIds: number[];
    coreConformation: string;
    coreContext: string;
    coreDescription: string;
    courseSchedule: string;
    createdBy: string;
    evaluationDescription: string;
    evaluationSystem: string;
    facultyIds: number[];
    generalContent: string;
    guideCode: string;
    hoursFreelanceWork: number;
    hoursTeacherDirectWork: number;
    learningGeneral: string;
    learningSpecific: string;
    modality: number;
    modalityIds: number[];
    monitorEmail: string;
    monitorName: string;
    monitorScheduleOperation: string;
    prerrequisites: string;
    programIds: number[];
    rating: string;
    roleId: number;
    strategies: string;
    studentAcademicWork: string;
    subjectCode: string;
    subjectGuideId: number;
    syncAsyncWork: string;
    teacherEmail: string;
    teacherName: string;
    teacherProfile: string;
    teacherScheduleOperation: string;
  };
  subjectRequest: {
    createdBy: string;
    description: string;
    fatherId: number;
    name: string;
    numberCredits: number;
    raeg: string;
    roleId: number;
    stepId: number;
    subjectRequest: {
      code: string;
      hourSelfWork: number;
      hoursInteractionTeacher: number;
      semester: number;
    };
    type: number;
    workflowId: number;
  };
  syllabus: {
    approvedDate: string;
    attendance: string;
    bibliographyBasic: string;
    bibliographyLenguaje: string;
    bibliographyWeb: string;
    campusIds: number[];
    cat: string;
    cine: string;
    code: string;
    content: string;
    createdAt: Date;
    createdBy: string;
    curriculumId: number;
    enabled: true;
    facultyIds: number[];
    learningGeneral: string;
    learningSpecific: string;
    levelFormationCredits: number;
    levelFormationIds: number[];
    levelFormationPrerequisites: string;
    modalities: number[];
    modalityObservation: string;
    nbc: string;
    pedagogicalPractices: string;
    programIds: number[];
    signatureType: number;
    signatureTypeObservation: string;
    stepId: number;
    subjectConformation: string;
    subjectContext: string;
    subjectDescription: string;
    syllabusId: number;
    updatedAt: Date;
    workflowBaseId: number;
  };
}

export interface IUserAssigned {
  userEmail: string;
  createdAt: Date;
}

export interface FilterProgramSubject {
  createdBy: string | null;
  isActivity: boolean;
  programId: number | null;
  roleId: number | null;
  semester: number | null;
  statusId: number | null;
  userId: string | null;
}

export interface ISubjectPrograms {
  name: string;
  createdAt: string;
  coordinatorId: string;
  idStatus: number;
  semester: number;
  idCurriculum: number;
  idSubjectGuide: number;
  activityStatus: number;
  activityCreatedAt: string;
  updateStatus?: any;
  updateCreatedAt?: any;
}

export interface ITeacherSubject {
  createdAt: string;
  userId: string;
  idStatus: number | null;
  idCurriculum: number | null;
  idSubjectGuide: number | null;
}

export interface ILevelTypes {
  type: number;
  name: string;
}

export interface ICreateLearningAssessment {
  createdBy: string;
  evaluationMode: string;
  file: {
    fileContent: string;
    fileExtension: string;
  } | null;
  learningAssessmentId: number;
  tittle: string;
  urlMoodle: string;
}
