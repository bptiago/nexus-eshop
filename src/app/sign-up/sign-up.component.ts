import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/model/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private userService: UserService) {}

  submitError = {
    message: 'Houve um error ao tentar realizar o cadastro!',
    showAlert: false,
  };

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}'),
    ]),
  });

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const user: UserModel = {
      email: this.signUpForm.controls.email.value!.toString(),
      password: this.signUpForm.controls.password.value!.toString(),
    };

    this.userService
      .save(user)
      .then(() => {
        console.log('Funcionou!');
      })
      .catch((error) => {
        this.submitError = {
          message: error.toString(),
          showAlert: true,
        };
      });
  }
}
