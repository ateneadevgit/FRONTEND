export enum Workflow {
  REVIEW = 'review',
  DECLINED = 'declined',
  COMPLETNESS = 'completeness',
  APPROVED = 'approved',
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

export enum WorklowType {
  PROGRAM = 'program',
}

export enum WorkflowStatus {
  APPROVED = 28,
  CREATE_SUMMARY = 29,
  ON_UPDATE = 30,
  ON_REVIEW = 31,
  ON_PROJECTION = 32,
}

export enum CreateUpdateSubjectGuideType {
  CREATE_SUBJECT_GUIDE_BY_CREATE_COORDINADOR = 1,
  UPDATE_SUBJECT_GUIDE_BY_STATUS_COMPLETENESS = 2,
  UPDATE_SUBJECT_GUIDE_BY_REQUEST_UPDATE = 6,
  EVALUATE_SUBJECT_GUIDE_DIRECTOR = 4,
  CREATE_ACTIVITY_PLAN_DOCENTE_BASICO = 3,
  EVALUATE_ACTIVITY_PLAN_DIRECTOR = 5,
}
