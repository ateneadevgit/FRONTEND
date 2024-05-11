import { FileContent } from './porpouse.interface';

export interface LoadDocumentsModal {
  header: string;
  visible: boolean;
  module?: string;
  html?: string;
  file?: FileContent;
  fileName?: string;
}
