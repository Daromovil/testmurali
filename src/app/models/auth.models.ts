export class LoginCmdInput {
  login: string;
  password: string;

  constructor(login: string, password) {
    this.login = login;
    this.password = password;
  }
}

export class LoginCmdOutput {
  userId: string;
  login: string;
  firstName: string;
  lastName: string;
  userRole: number;
  userRoleName: string;
  resetPasswordFlag: boolean;
  jwtToken: string;
  refreshToken?: string;
}
