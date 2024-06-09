import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['common', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const { email, password, userType } = this.signUpForm.value;
      this.authService.signUp(email, password, userType).then(() => {
        console.log('Usuário cadastrado com sucesso');
      }).catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
      });
    }
  }
}
