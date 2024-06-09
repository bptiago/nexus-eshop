export interface UserModel {
  key?: string;
  name: string;
  surname: string;
  email: string;
  address: string;
  phone: string;
  cpf: string;
  password: string;
  userType: 'common';
}

export interface User {
  uid: string;
  email: string;
}
