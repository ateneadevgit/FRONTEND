import { Injectable } from '@angular/core';
import { Actions } from 'src/enums/actions.enum';
import { ActionsWorkflow } from 'src/models/workflow.interface';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  permissions = {
    canEvaluate: false,
    canLoadFiles: false,
    canView: false,
    canViewComments: false,
    canViewSummary: false,
    canCreateSummary: false,
    canEvaluateSummary: false,
    canFillForms: false,
    canCreateComment: false,
    canApproveCampus: false,
    canSendToReview: false,
    canViewCurriculum: false,
    canCreateCurriculum: false,
    canViewProfileEntry: false,
    canCreateProfileEntry: false,
    canViewRae: false,
    canCreateRae: false,
    canViewCompetencies: false,
    canCreateCompetencies: false,
    canViewProgramObjective: false,
    canCreateProgramObjective: false,
    canViewSilabus: false,
    canCreateSilabus: false,
    canViewEnglishFormation: false,
    canCreateEnglishFormation: false,
    canViewAcademicProgramsOfCampus: false,
    canCreateAcademicProgramsOfCampus: false,
    canViewExtensionSocialProjection: false,
    canCreateExtensionSocialProjection: false,
    canViewInternational: false,
    canCreateInternational: false,
    canViewInvestigativeInformation: false,
    canCreateInvestigativeInformation: false,
  };
  /**
   * Mapea los permisos de usuario basados en las acciones recibidas.
   * @param actions La lista de acciones obtenidas para el usuario.
   */
  mappingPermissions(actions: ActionsWorkflow[]) {
    this.resetPermissions();
    actions.forEach((item) => {
      if (item.actionId === Actions.CAN_EVALUATE) this.permissions.canEvaluate = true;
      if (item.actionId === Actions.CAN_LOAD_FILES) this.permissions.canLoadFiles = true;
      if (item.actionId === Actions.CAN_VIEW) this.permissions.canView = true;
      if (item.actionId === Actions.CAN_VIEW_COMMENTS) this.permissions.canViewComments = true;
      if (item.actionId === Actions.CAN_SEND_TO_REVIEW) this.permissions.canSendToReview = true;
      if (item.actionId === Actions.CAN_VIEW_SUMMARY) this.permissions.canViewSummary = true;
      if (item.actionId === Actions.CAN_CREATE_CURRICULUM)
        this.permissions.canCreateCurriculum = true;
      if (item.actionId === Actions.CAN_VIEW_CURRICULUM) this.permissions.canViewCurriculum = true;
      if (item.actionId === Actions.CAN_CREATE_RAE) this.permissions.canCreateRae = true;
      if (item.actionId === Actions.CAN_VIEW_COMPETENCIES)
        this.permissions.canViewCompetencies = true;
      if (item.actionId === Actions.CAN_CREATE_COMPETENCIES)
        this.permissions.canCreateCompetencies = true;
      if (item.actionId === Actions.CAN_CREATE_SILABUS) this.permissions.canCreateSilabus = true;
      if (item.actionId === Actions.CAN_VIEW_SILABUS) this.permissions.canViewSilabus = true;
      if (item.actionId === Actions.CAN_APPROVE_CAMPUS) this.permissions.canApproveCampus = true;
      if (item.actionId === Actions.CAN_CREATE_SUMMARY) this.permissions.canCreateSummary = true;
      if (item.actionId === Actions.CAN_EVALUATE_SUMMARY)
        this.permissions.canEvaluateSummary = true;

      if (item.actionId === Actions.CAN_CREATE_OBJECTIVES)
        this.permissions.canCreateProgramObjective = true;
      if (item.actionId === Actions.CAN_VIEW_OBJECTIVES)
        this.permissions.canViewProgramObjective = true;
      if (item.actionId === Actions.CAN_VIEW_ENGLISH_FORMATION)
        this.permissions.canViewEnglishFormation = true;
      if (item.actionId === Actions.CAN_CREATE_ENGLISH_FORMATION)
        this.permissions.canCreateEnglishFormation = true;
      if (item.actionId === Actions.CAN_VIEW_CAMPUS_ACADEMIC_PROGRAMS)
        this.permissions.canViewAcademicProgramsOfCampus = true;
      if (item.actionId === Actions.CAN_CREATE_CAMPUS_ACADEMIC_PROGRAMS)
        this.permissions.canCreateAcademicProgramsOfCampus = true;
      if (item.actionId === Actions.CAN_VIEW_EXTENSION_SOCIAL_PROJECTION)
        this.permissions.canViewExtensionSocialProjection = true;
      if (item.actionId === Actions.CAN_CREATE_EXTENSION_SOCIAL_PROJECTION)
        this.permissions.canCreateExtensionSocialProjection = true;
      if (item.actionId === Actions.CAN_VIEW_INTERNATIONAL)
        this.permissions.canViewInternational = true;
      if (item.actionId === Actions.CAN_CREATE_INTERNATIONAL)
        this.permissions.canCreateInternational = true;
      if (item.actionId === Actions.CAN_VIEW_INVESTIGATIVE_INFORMATION)
        this.permissions.canViewInvestigativeInformation = true;
      if (item.actionId === Actions.CAN_CREATE_INVESTIGATIVE_INFORMATION)
        this.permissions.canCreateInvestigativeInformation = true;
      if (item.actionId === Actions.CAN_VIEW_PROFILE_ENTRY)
        this.permissions.canViewProfileEntry = true;
      if (item.actionId === Actions.CAN_CREATE_PROFILE_ENTRY)
        this.permissions.canCreateProfileEntry = true;
    });
  }
  /**
   * Restablece todos los permisos a su valor predeterminado (falso).
   */
  resetPermissions() {
    this.permissions = {
      canEvaluate: false,
      canLoadFiles: false,
      canView: false,
      canViewComments: false,
      canViewSummary: false,
      canEvaluateSummary: false,
      canCreateSummary: false,
      canFillForms: false,
      canCreateComment: false,
      canApproveCampus: false,
      canSendToReview: false,
      canViewCurriculum: false,
      canCreateCurriculum: false,
      canViewProfileEntry: false,
      canCreateProfileEntry: false,
      canViewRae: false,
      canCreateRae: false,
      canViewCompetencies: false,
      canCreateCompetencies: false,
      canViewProgramObjective: false,
      canCreateProgramObjective: false,
      canViewSilabus: false,
      canCreateSilabus: false,
      canViewEnglishFormation: false,
      canCreateEnglishFormation: false,
      canViewAcademicProgramsOfCampus: false,
      canCreateAcademicProgramsOfCampus: false,
      canViewExtensionSocialProjection: false,
      canCreateExtensionSocialProjection: false,
      canViewInternational: false,
      canCreateInternational: false,
      canViewInvestigativeInformation: false,
      canCreateInvestigativeInformation: false,
    };
  }
}
