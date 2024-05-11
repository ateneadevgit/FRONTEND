export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresIn: Date;
  issuedAt: Date;
  userData: UserData;
}

export interface UserData {
  email: string;
  password: string;
  name: string;
  faculty: number;
  role: number;
}
