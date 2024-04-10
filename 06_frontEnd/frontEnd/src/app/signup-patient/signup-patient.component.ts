import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-patient',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,HttpClientModule ],
  templateUrl: './signup-patient.component.html',
  styleUrl: './signup-patient.component.css'
})

// {
//   "name": "keshav Khandelwal",
//   "email":"ayushbhople@gmail.com",
//   "age":90,
//   "gender":"male",
//   "PhoneNumber":1234567891,
//   "password":"keshav125"
  
// }
export class SignupPatientComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      age: ['',Validators.required],
      gender: ['',Validators.required],
      PhoneNumber: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.showAlert();
      return;
    }

    const patientData = this.registrationForm.value;
    console.log(patientData)

    this.http.post('http://localhost:3000/auth/patients', patientData).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup failed', error);
      },
    });
  }

  showAlert() {
    alert('Please fill all the fields correctly.');
  }
}

