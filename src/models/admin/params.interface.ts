export interface IParam {
  settingId: number;
  settingValue: string;
  previewName: string;
  description: string;
  updatedAt: Date;
}

export interface IParamRequest {
  description: string;
  value: string;
}
