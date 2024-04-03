import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-login-doctor',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule,FormsModule],
  templateUrl: './login-doctor.component.html',
  styleUrl: './login-doctor.component.css',
  providers: [AuthService],
})
export class LoginDoctorComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const userData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.http
      .post<any>('http://localhost:3000/doctor/Doclogin', userData)
      .subscribe({
        next: async (response) => {
          console.log('Login Successful', response);
          const token = response.token;
          this.authService.setToken(token);
          this.router.navigate(['/doctorProfile']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.loginError = 'Invalid email or password';
        },
      });
  }
  taketosignup()
  {
    this.router.navigate(['/signupforpatinent'])
  }
}
