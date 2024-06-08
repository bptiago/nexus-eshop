import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        console.log('Enviou e-mail de confirmação de cadastro.');
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.sendVerificationMail();
        console.log('Cadastro usuário no auth');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
