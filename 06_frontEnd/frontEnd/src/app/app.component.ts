import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainBodyHomeComponent } from './main-body-home/main-body-home.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { SignupPatientComponent } from './signup-patient/signup-patient.component';
import { ProfileCardComponent } from './profilePage/profile-card/profile-card.component';
import { ImageComponent } from './profilePage/image/image.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { DoctorContainerComponent } from './profile-doctor/doctor-container/doctor-container.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavBarComponent,
    MainBodyHomeComponent,
    LoginContainerComponent,
    SignupPatientComponent,
    ProfileCardComponent,
    ImageComponent,
    PatientHistoryComponent,
  DoctorContainerComponent,HomepageComponent,DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontEnd';
}
