import { Component, OnInit } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { AuthService } from '../../auth.service';
import {MatIconModule} from '@angular/material/icon';
import {matTooltipAnimations, MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

import { HttpClientModule, HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImageComponent,HttpClientModule,MatIconModule,MatButtonModule,MatTooltipModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css',
  providers: [AuthService],
 
})
export class ProfileCardComponent implements OnInit {
  patientName: string = "keshav";
  patientEmail: string = "keshav@gmail.com";
  patientAge: number = 30;
  phoneNumber: string = "1234567891";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    this.authService.request('GET', `hospital/pprofile`, {headers}).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response.body);
        this.patientName = response.body.name;
        this.patientEmail = response.body.email;
        this.patientAge = response.body.age;
        this.phoneNumber = response.body.PhoneNumber;
        console.log(this.phoneNumber)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  taketohistorypage() {
    this.router.navigate(['/patinetHistory']);
  }
}



