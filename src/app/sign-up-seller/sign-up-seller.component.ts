import { Component, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { SellerModel } from '../user/model/seller.model';

@Component({
  selector: 'app-sign-up-seller',
  templateUrl: './sign-up-seller.component.html',
  styleUrl: './sign-up-seller.component.css',
})
export class SignUpSellerComponent {
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
    company: new FormControl('', [Validators.required]),
    ddd: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{2}$/),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{5}-\d{4}$/),
    ]),
    cnpj: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/),
    ]),
  });

  maskPhoneNumber() {
    const input = document.getElementById('phoneNumber') as HTMLInputElement;
    let length = input.value.length;

    if (length === 5) {
      input.value += '-';
    }
  }

  maskCpnj() {
    const input = document.getElementById('cnpj') as HTMLInputElement;
    let length = input.value.length;

    if (length === 2 || length === 6) {
      input.value += '.';
    } else if (length === 10) {
      input.value += '/';
    } else if (length === 15) {
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
    const user = { phone: phone, ...userInfo } as SellerModel;

    this.userService
      .save(user, 'sellers')
      .then(() => {
        console.log('Usuário cadastrado.');
      })
      .catch((error) => {
        this.submitError = {
          message: error.toString(),
          showAlert: true,
        };
      });
  }
}
