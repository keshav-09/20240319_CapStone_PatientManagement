import { CommonModule, NgClass } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { NgModel, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Import FormsModule
@Component({
  selector: 'app-doctor-search-history',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './doctor-search-history.component.html',
  styleUrl: './doctor-search-history.component.css'
})
export class DoctorSearchHistoryComponent {
  email: string = '';
  prescriptions: any[] = [];
  selectedPrescription: any; 
  constructor(private http: HttpClient) { }
  // searchPrescriptions() {
  //   if (this.email.trim() === '') {
  //     // Handle empty email input
  //     return;
  //   }
  //   // Make API request to fetch prescriptions for the entered email
  //   this.http.post<any[]>('http://localhost:3000/doctor/search', { email: this.email })
  //     .subscribe(
  //       (data) => {
  //         this.prescriptions = data;
  //         // Extract and display medicine names from the fetched data
  //         this.prescriptions.forEach(prescription => {
  //           prescription.medicineNames = prescription.medicines.map((medicine: { MedicineName: any; }) => medicine.MedicineName).join(', ');
  //         });
  //       },
  //       (error) => {
  //         console.error('Error fetching prescriptions:', error);
  //       }
  //     );
  // }


  searchPrescriptions() {
    if (!this.email.trim()) {
      console.error('Email is required.');
      return;
    }

    this.http.post<any[]>('http://localhost:3000/doctor/search', { email: this.email })
      .subscribe(
        (data) => {
          this.prescriptions = data;
          this.prescriptions.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });

        },
        (error) => {
          console.error('Error fetching prescriptions:', error);
        }
      );
  }

  // searchPrescriptions() {
  //   if (this.email.trim() === '') {
  //     // Handle empty email input
  //     return;
  //   }
  //   // Make API request to fetch prescriptions for the entered email
  //   this.http.post<any[]>('http://localhost:3000/doctor/search', { email: this.email })
  //     .subscribe(
  //       (data) => {
  //         this.prescriptions = data;
  //       },
  //       (error) => {
  //         console.error('Error fetching prescriptions:', error);
  //       }
  //     );
  // }

  showMedicineArray(prescriptionId: string) {
    // Make API request to fetch medicine array for the selected prescription ID
    this.http.get<any[]>(`http://localhost:3000/doctor/prescriptions/${prescriptionId}/medicines`)
      .subscribe(
        (data) => {
          // Assuming data is an array of medicine objects
          console.log('Medicine Array:', data);
          // You can store the medicine array in a variable for further processing
          // Example: this.medicineArray = data;
          // Or display it directly in the UI
          // Example: this.displayMedicineArray(data);
        },
        (error) => {
          console.error('Error fetching medicine array:', error);
        }
      );
  }
  
}
