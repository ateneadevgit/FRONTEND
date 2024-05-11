export interface IDirectory {
  name: string;
  charge: string;
  email: string;
  faculty: number | null;
  facultyName?: string;
  campus: number[];
  campusName?: (string | null)[];
}

export interface IDirectorySearch {
  name: string | null;
  campusId: number[];
  facultyId: number[];
}
