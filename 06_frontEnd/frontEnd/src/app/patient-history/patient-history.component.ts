

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { catchError, merge, startWith, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-history',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule,CommonModule,HttpClientModule],
  templateUrl: './patient-history.component.html',
  styleUrl: './patient-history.component.css'
})
export class PatientHistoryComponent {
  prescriptions: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPrescriptions();
  }

  fetchPrescriptions() {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:3000/hospital/patinetprescription', {
      headers
    })
      .subscribe(data => {
        console.log(data)
        this.prescriptions = data;
      }, error => {
        console.error('Error fetching prescriptions:', error);
      });
  }
}
