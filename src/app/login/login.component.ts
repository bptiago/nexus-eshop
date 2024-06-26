import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../user/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  submitError = {
    message: 'Houve um error ao tentar fazer login!',
    showAlert: false,
  };

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}'),
    ]),
  });

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const email = this.formGroup.controls.email.value!.toString();
    const password = this.formGroup.controls.password.value!.toString();

    const handleLogin = (usersList: any[], userType: 'users' | 'sellers') => {
      const filteredUsers = usersList.filter((rawUser) => {
        const user = rawUser as UserModel;
        if (user.email === email && user.password === password) return user;
        return;
      });

      if (filteredUsers.length === 1) {
        const loggedInUser = filteredUsers[0];
        localStorage.setItem('userType', loggedInUser.userType);
        sessionStorage.setItem('userType', loggedInUser.userType);

        console.log('Deu certo. Ir para o portal do usuário');
        this.router.navigate(['/']);
        return true;
      } else if (filteredUsers.length > 1) {
        this.submitError = {
          showAlert: true,
          message:
            'Erro de registro. Foram encontrados múltiplos usuários correspondentes.',
        };
      }
      return false;
    };

    this.userService.getAll('users').forEach((usersList) => {
      if (!handleLogin(usersList, 'users')) {
        this.userService.getAll('sellers').forEach((sellersList) => {
          if (!handleLogin(sellersList, 'sellers')) {
            this.submitError = {
              showAlert: true,
              message: 'E-mail ou senha incorretos. Favor tentar novamente.',
            };
          }
        });
      }
    });
  }
}
