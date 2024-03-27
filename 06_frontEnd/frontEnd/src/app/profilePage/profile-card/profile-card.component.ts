import { Component, OnInit } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { AuthService } from '../../auth.service';
import {MatIconModule} from '@angular/material/icon';
import {matTooltipAnimations, MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
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
  patientName: string ="keshav";
  patientEmail: string="keshav@gmail.com";
  patientAge: Number=30;
  PhoneNumber: Number=1234567891;
 
  constructor(private authService: AuthService, private router:Router) { }


  ngOnInit(): void {
    this.authService.request('GET', `hospital/pprofile`).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response)
        // {
//   "name": "keshav Khandelwal",
//   "email": "ayushbhople@gmail.com",
//   "age": 90,
//   "gender": "male",
//   "PhoneNumber": 1234567891,
//   "password": "$2b$10$Z/BOJGHAvW4cTcqs4L1fD.XWRGRsyo/6xIwTZidsAGqq/MFZoqti2"
// }
        this.patientName=response.body.name
        this.patientEmail=response.body.email
        this.patientAge=response.body.age
        this.PhoneNumber=response.body.PhoneNumber


      },
      (error) => {
        console.error(error)
      }
    );
  }

  taketohistorypage(){
    this.router.navigate(['/patinetHistory']);
  }
}



