import { Component, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrl: './sign-up-user.component.css',
})
export class SignUpUserComponent {
  constructor(
    private userService: UserService,
    public ngZone: NgZone,
    public router: Router
  ) {}

  submitError = {
    message: 'Houve um erro ao tentar realizar o cadastro!',
    showAlert: false,
  };

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}'),
    ]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    ddd: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{2}$/),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{5}-\d{4}$/),
    ]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/),
    ]),
  });

  maskPhoneNumber() {
    const input = document.getElementById('phoneNumber') as HTMLInputElement;
    let length = input.value.length;

    if (length === 5) {
      input.value += '-';
    }
  }

  maskCpf() {
    const input = document.getElementById('cpf') as HTMLInputElement;
    let length = input.value.length;

    if (length === 3 || length === 7) {
      input.value += '.';
    } else if (length === 11) {
      input.value += '-';
    }
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const phone =
      `(${this.signUpForm.controls.ddd.value!})` +
      this.signUpForm.controls.phoneNumber.value!;

    const { ddd, phoneNumber, ...userInfo } = this.signUpForm.value;
    const user = { phone: phone, ...userInfo } as UserModel;

    this.userService
      .save(user, 'users')
      .then(() => {
        console.log('Usuário cadastrado.');
      })
      .catch((error) => {
        this.submitError = {
          message: error.toString(),
          showAlert: true,
        };
      });

    this.router.navigate(['/']);
  }
}
