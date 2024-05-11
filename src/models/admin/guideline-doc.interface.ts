import { FileContent } from '../porpouse.interface';

export interface IDocGuideline {
  programAttachmentId: number;
  name: string;
  fileUrl: string;
  fileType: number;
  createdBy: string;
  createdAt: Date;
  enabled: boolean;
}

export interface IDocGuidelineRequest {
  file: FileContent | null;
  fatherId: number | null;
  fileName: string;
  fileOrder: number | null;
  fileType: number;
}
