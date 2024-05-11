export interface SendCurriculmSummary {
  createdBy: string | null;
  curriculumType: number;
  roleId: number | null;
  stepId: number;
  summary: string;
  workflowId: number;
}

export interface UpdateCurriculumSummary {
  curriculum: string;
}

export interface CurriculumSummary {
  curriculumSummaryId: number;
  curriculumSummary: string;
}

export interface ApproveTraza {
  createdBy: null;
  feedbackStatus: string;
  fileFeedback: {
    fileContent: string;
    fileExtension: string;
  } | null;
  roleId: null;
}
