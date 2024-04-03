import { Component, HostListener } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  
  
  signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Form submitted successfully!');
    // Your form submission logic here
  }

  signupForPatient() {
    this.router.navigate(['/login']);
  }

  changeBorderColor(fieldName: string) {
    const field = this.signInForm.get(fieldName);
    if (field) {
      field.valueChanges.subscribe(() => {
        field.markAsTouched();
      });
    }
  }  
}
