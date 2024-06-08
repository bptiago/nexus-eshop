export type UserModel = {
  key?: string;
  email: string;
  password: string;
};

export interface User {
  uid: string;
  email: string;
}
