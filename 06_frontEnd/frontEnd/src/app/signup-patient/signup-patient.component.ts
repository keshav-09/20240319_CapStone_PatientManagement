import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-patient',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
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
  Name:string='';
  email:string='';
  age:number=0;
  gender:string='';
  PhoneNumber :Number=0;
  password:string=''  

  constructor(private fb: FormBuilder, 
    private http: HttpClient,
    private router: Router
    ) {
    this.registrationForm = this.fb.group({
      Name: ['', Validators.required],
      age:[0,Validators.required],
      gender:[''],
      phoneNumber:[0],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(200),
          (control: { value: any }) => {
            const passwordRegex =
              /^(?=.*[A-Z])(?=.*[!@#$%^&()])(?=.*[0-9])(?!.*\s)(?!.*(\d)\1)/;
            return passwordRegex.test(control.value)
              ? null
              : { invalidPassword: true };
          },
        ],
      ],

      confirmPassword: ['', Validators.required],
      
    },);
  }



  onSubmit() {
    const patientData={
      name:this.Name,
      email:this.email,
      password:this.password,
      age:this.age,
      gender:this.gender,
      phoneNumber:this.PhoneNumber,

    }; this.http.post('http://localhost:3000/auth/patients',patientData ).subscribe({
      next: (response) => {
        // Handle the response if needed
        console.log('Signup successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        // Handle any errors here
        console.error('Signup failed', error);
      },
    })

  }
  showAlert() {
    if (this.registrationForm.invalid) {
      alert('Please fill all the fields correctly.');
    }
  }
}

