import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor and *ngIf
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prescription-form',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './prescription-form.component.html',
  styleUrl: './prescription-form.component.css',
  providers: [AuthService],
})

export class PrescriptionFormComponent {
  rows: any[] = []; // Initialize rows array
  disease: string = ''
  email: string = ""
  prescriptionSubmitted: boolean = false;

  constructor(private http: HttpClient,private authService: AuthService,private _snackBar: MatSnackBar ) { }


  removeRow(index: number) {
    this.rows.splice(index, 1);
  }
  addNewRow() {
    this.rows.push({ // Push a new object into the rows array
      medicine: '', // Initialize medicine to empty string
      frequency: '', // Initialize frequency to empty string
      period: '' // Initialize period to empty string
    });
  }
  checkEmptyFields() {
    if (!this.email || !this.disease) {
      this.openSnackBar('Please fill in all fields');
      return true; // At least one field is empty
    }
    return false; // All fields are filled
  }

  submitPrescription() {
    if (this.checkEmptyFields()) {
      return; // Stop form submission if any field is empty
    }
    const medicines = this.rows.map(row => ({
      MedicineName: row.medicine,
      frequency: row.frequency,
      Period: row.period
    }));

    const prescriptionData = {
      email: this.email,
      disease: this.disease,
      medicines: medicines
    };
    const jsonData = JSON.stringify(prescriptionData);
    const token = localStorage.getItem('token');
    console.log(jsonData);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:3000/doctor/prescriptions', jsonData, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error adding prescription:', error);
          if (error.status === 404 && error.error.message === 'Patient not found') {
            this.openSnackBar('Email ID not found. Please enter a valid email ID.');
          }
          return throwError(error);
        })
      )
      .subscribe((response: any) => {

        // console.log('Prescription added successfully:', response);

        this.resetForm(); // Reset form after successful submission
        this.openSnackBar('Prescription submitted successfully!'); 
        this.prescriptionSubmitted = true;

      });
      
    
  }

  
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds
      panelClass: ['custom-snackbar']
    });
  }

  resetForm() {
    this.disease = '';
    this.email = '';
    this.rows = [];
  }


}



