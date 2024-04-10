import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-signup',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule,CommonModule],
  templateUrl: './doctor-signup.component.html',
  styleUrl: './doctor-signup.component.css'
})
export class DoctorSignupComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted: boolean = false;
 

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required, Validators.pattern(/^\d{10}$/)],
      specialty: ['', Validators.required],
      password: ['', Validators.required,Validators.minLength(8)]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      console.log("Invalid form");
      return
    }

    const formData = this.registrationForm.value;
    console.log(formData)
    this.http.post<any>('http://localhost:3000/doctor/newdoctor', formData).subscribe(
      response => {
        console.log('Registration successful:', response);
        // Reset the form after successful registration
        this.registrationForm.reset();
        this.router.navigate(['/doctorLogin']);
      },
      (error: HttpErrorResponse) => {
        console.error('Registration failed:', error);
      }
    );
  }
}
