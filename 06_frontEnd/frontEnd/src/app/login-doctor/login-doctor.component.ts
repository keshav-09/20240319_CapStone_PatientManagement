import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
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
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './login-doctor.component.html',
  styleUrl: './login-doctor.component.css',
  providers: [AuthService],
})
export class LoginDoctorComponent {
  loginForm: FormGroup;
  email: string = '';
  password: string = '';

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
    console.log('submit button is press');
    console.log('Form submitted successfully!');
    const userData = {
      email: this.email,
      password: this.password,
    };
    
    this.http.
    post<any>('http://localhost:3000/doctor/Doclogin', userData)
      .subscribe({
        next:  async (response) => {
          console.log('Login Successful', response);
          const token = response.token;
          this.authService.setToken(token);
          // Check if login was successful
          this.router.navigate(['/doctorProfile']);
         
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Handle unsuccessful login (e.g., display error message)
        }
      });
  }
  
  showAlert() {
    if (this.loginForm.invalid) {
      alert('Please fill all the fields correctly.');
    }
  }
}
