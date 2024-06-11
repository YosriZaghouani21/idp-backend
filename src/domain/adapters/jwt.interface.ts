export interface IJwtServicePayload {
  id: string;
  name: string;
  email: string;
  Role: string;
}

export interface IJwtService {
  checkToken(token: string): Promise<any>;
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string;
}
