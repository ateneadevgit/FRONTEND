export interface INif {
  nifsId?: number;
  content: string;
  createdBy: string | null;
  image:
    | {
        fileContent: string;
        fileExtension: string;
      }
    | string
    | null;
  image1: string;
  image2: string;
  sections: INif[];
  type: number | null;
}
