import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserModel } from './model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user: UserModel) {
    return this.db.list('users').push(user);
  }

  getById(key: string) {
    return this.db.object('users/' + key).valueChanges();
  }
}
