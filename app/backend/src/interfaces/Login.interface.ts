export interface ILogin {
  email: string;
  password: string;
}

type LoginReturn = {
  id: number;
  email: string;
  role: string;
};

export interface ILoginService {
  validateUser(data: ILogin): Promise<LoginReturn>
}