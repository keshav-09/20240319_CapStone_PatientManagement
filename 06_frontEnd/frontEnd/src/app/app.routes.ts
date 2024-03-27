import { Routes } from '@angular/router';
import { MainBodyHomeComponent } from './main-body-home/main-body-home.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { ProfileCardComponent } from './profilePage/profile-card/profile-card.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { LoginDoctorComponent } from './login-doctor/login-doctor.component';
import { DoctorContainerComponent } from './profile-doctor/doctor-container/doctor-container.component';
import { PrescriptionFormComponent } from './prescription-form/prescription-form.component';
import { DoctorSearchHistoryComponent } from './doctor-search-history/doctor-search-history.component';
import { SignupPatientComponent } from './signup-patient/signup-patient.component';

export const routes: Routes = [
    {path: '', component: MainBodyHomeComponent },
    {path:'login',component: LoginContainerComponent},
    {path:'doctorLogin',component:LoginDoctorComponent},
    {path:'patinetProfile',component: ProfileCardComponent},
    {path:'patinetHistory',component:PatientHistoryComponent},
    {path:"doctorProfile",component:DoctorContainerComponent},
    {path:"addmedicine",component:PrescriptionFormComponent},
    {path:"searchDoctor",component:DoctorSearchHistoryComponent},
    {path:"signupforpatinent",component:SignupPatientComponent}

];
