
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth.service';
import {MatIconModule} from '@angular/material/icon';
import {matTooltipAnimations, MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import {  Router } from '@angular/router';
import { ImageDoctorComponent } from '../image-doctor/image-doctor.component';

@Component({
  selector: 'app-doctor-container',
  standalone: true,
  imports: [ImageDoctorComponent,HttpClientModule,MatIconModule,MatButtonModule,MatTooltipModule],
  templateUrl: './doctor-container.component.html',
  styleUrl: './doctor-container.component.css',
  providers: [AuthService],
})

export class DoctorContainerComponent  implements OnInit {
  doctorName: string ="keshav";
  doctorEmail: string="keshav@gmail.com";
  PhoneNumber: Number=1234567891;
  specialty:string="Mbbs";
 
  constructor(private authService: AuthService, private router:Router) { }


  ngOnInit(): void {
    this.authService.request('GET', `doctor/doctorProfile`).subscribe(
      (response: HttpResponse<any>) => {
        

        // {
        //   "name": "JohnDo",
        //   "email": "mudit@example.com",
        //   "PhoneNumber": 1234567890,
        //   "gender": "male",
        //   "specialty": "Cardiology"
        // }
        console.log(response)
        this.doctorName=response.body.name
        this.doctorEmail=response.body.email
        this.PhoneNumber=response.body.PhoneNumber
        this.specialty=response.body.specialty


      },
      (error) => {
        console.log("hello")
        console.error(error)
      }

    );
  }
  takeToMedicinePage(){
    this.router.navigate(['/addmedicine']);
  }
  takeToHistory(){
    this.router.navigate(['/searchDoctor']);
  }
}


