import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserModel } from './model/user.model';
import { SellerModel } from './model/seller.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user: UserModel | SellerModel, userType: 'users' | 'sellers') {
    return this.db.list(userType).push(user);
  }

  getById(key: string, userType: 'users' | 'sellers') {
    return this.db.object(`${userType}/` + key).valueChanges();
  }

  getAll(userType: 'users' | 'sellers') {
    return this.db.list<UserModel>(userType).valueChanges();
  }
}
