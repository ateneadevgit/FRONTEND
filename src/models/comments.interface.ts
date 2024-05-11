export interface CommentsWorkflow {
  reviewId: number;
  review: string;
  roleId: number;
  createdBy: string;
  createdAt: string;
  isRead: boolean | null;
  sender?: string;
  replies: CommentsWorkflow[];
}

export interface ReplyWorkflow {
  createdBy: string | null;
  replyTo: number;
  review: string;
  roleId: number | null;
  stepId: number;
  workflowId: number;
}

export interface IGetCommentsEdit {
  objectId: number;
  userId: string | null;
  type: number;
}

export interface ReplyEditModule {
  review: string;
  createdBy: string | null;
  roleId: number | null;
  replyTo: number | null;
  objectId: number;
  objectType: string;
}

export interface RQComments {
  objectId: number;
  type: number;
  userId: string | number;
}

export interface ReplyComments {
  createdBy: string | null;
  objectId: number;
  objectType: number;
  replyTo: number;
  review: string;
  roleId: number | null;
  sendTo: string;
}
