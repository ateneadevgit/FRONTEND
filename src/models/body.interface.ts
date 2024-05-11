export interface BodyResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface IPagination {
  page: number;
  size: number;
}

export interface ITokenRefresh {
  token: string;
}

export interface IAuthorizerRefresh {
  token: string;
  tokenType: string;
  expiresIn: string;
  issuedAt: string;
}
