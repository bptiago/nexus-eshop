import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {}

  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        console.log('Enviou e-mail de confirmação de cadastro.');
      });
  }

  signUp(email: string, password: string, userType: 'common' | 'seller') {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const uid = result.user?.uid;
        if (uid) {
          this.db.object(`users/${uid}`).set({
            email,
            userType,
          }).then(() => {
            console.log('Usuário armazenado no Firebase com userType:', userType);
          });
        }
        this.sendVerificationMail();
        console.log('Cadastro usuário no auth');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      const uid = result.user?.uid;
      console.log('Login successful, user ID:', uid);
      
      this.db.object(`users/${uid}`).valueChanges().subscribe((user: any) => {
        if (user) {
          console.log('User found in users path:', user);
          console.log('User type found in users:', user.userType);
          this.setUserType(user.userType);
          this.router.navigate(['/']);
        } else {
          this.db.object(`sellers/${uid}`).valueChanges().subscribe((seller: any) => {
            if (seller) {
              console.log('User found in sellers path:', seller);
              console.log('User type found in sellers:', seller.userType);
              this.setUserType(seller.userType);
              this.router.navigate(['/']);
            } else {
              console.log('No user type found in both paths.');
            }
          });
        }
      });
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.clearUserType();
      this.router.navigate(['/login']);
    });
  }

  setUserType(userType: string) {
    if (typeof window !== 'undefined') {
      console.log('Setting userType:', userType);
      localStorage.setItem('userType', userType);
      sessionStorage.setItem('userType', userType);
    }
  }

  clearUserType() {
    if (typeof window !== 'undefined') {
      console.log('Clearing userType');
      localStorage.removeItem('userType');
      sessionStorage.removeItem('userType');
    }
  }

  getUserType(): string | null {
    if (typeof window !== 'undefined') {
      const userType = localStorage.getItem('userType') || sessionStorage.getItem('userType');
      console.log('Getting userType:', userType);
      return userType;
    }
    return null;
  }
}
