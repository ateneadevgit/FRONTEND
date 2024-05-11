/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TrceabilityWorkflow {
  academicCouncilMinute: TrceabilityTimeWorkflow;
  campus: TrceabilityCampusWorkflow[];
  createdBy: string;
  menEndDate: string;
  nsacesDate: string;
  proposalAprovedDate: string;
  roleId: number | null;
  sinies: string;
  superiorCouncilMinute: TrceabilityTimeWorkflow;
  viceAcademicMinute: TrceabilityTimeWorkflow;
  approvedMinute: { fileContent: string; fileExtension: string };
}

export interface TrceabilityTimeWorkflow {
  minute: string;
  minuteDate: string;
}

export interface TrceabilityCampusWorkflow {
  campusId: number;
  resolution: string;
  resolutionDate: string;
}

export interface FormCampusArray {
  label?: string;
  ckeck?: boolean;
  campusId?: number;
  resolution?: string;
  resolutionDate?: string;
}

export interface StudyPlanStudent {
  curriculumList: any[];
  semesterList: any[];
}

export interface ISubjectData {
  name: string;
  code: string;
  numberCredits: number;
  curriculumId: number;
  hasSyllabus: boolean;
}
