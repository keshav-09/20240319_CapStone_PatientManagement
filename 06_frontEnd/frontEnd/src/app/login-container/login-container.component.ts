import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule,FormsModule],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css',
  providers: [AuthService],
})
export class LoginContainerComponent {
  
  loginForm: FormGroup;
  loginError: string = '';
  email:string='';
  password:string='';
  

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
    console.log('submit button is pressed');
    console.log('Form submitted successfully!');
    
    // Check if the form is invalid
    if (this.loginForm.invalid) {
      this.showAlert();
      return;
    }
  
    // Extract form values from the loginForm FormGroup
    const userData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    
    if (!userData.email || !userData.password) {
      console.error('Invalid form control values');
      return;
    }
    
    this.http.post<any>('http://localhost:3000/auth/login', userData)
      .subscribe({
        next: async (response) => {
          console.log('Login Successful', response);
          const token = response.token;
          this.authService.setToken(token);
          // Check if login was successful
          this.router.navigate(['/patinetProfile']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Handle unsuccessful login (e.g., display error message)
          this.loginError = 'Invalid email or password.';
        }
      });
  }
  
  
  showAlert() {
    if (this.loginForm.invalid) {
      alert('Please fill all the fields correctly.');
    }
  }
}
