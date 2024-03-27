import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor and *ngIf
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { catchError, throwError } from 'rxjs';
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

  constructor(private http: HttpClient,private authService: AuthService ) { }


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

  submitPrescription() {
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
          return throwError(error);
        })
      )
      .subscribe((response: any) => {
        console.log('Prescription added successfully:', response);
        this.resetForm(); // Reset form after successful submission
        this.prescriptionSubmitted = true;
      });
  }

  //   if (this.authService.isAuthenticated()) {
  //     this.http
  //       .post('http://localhost:3000/doctor/prescriptions', prescriptionData)
  //       .pipe(
  //         catchError((error: HttpErrorResponse) => {
  //           console.error('Error adding prescription:', error);
  //           return throwError(error);
  //         })
  //       )
  //       .subscribe((response: any) => {
  //         console.log('Prescription added successfully:', response);
  //         this.resetForm(); // Reset form after successful submission
  //         this.prescriptionSubmitted = true;
  //       });
  //   } else {
  //     console.error('User not authenticated');
  //     // Handle unauthorized access
  //   }
  // }

  resetForm() {
    this.disease = '';
    this.email = '';
    this.rows = [];
  }


}


