import { Routes } from '@angular/router';
import { MainBodyHomeComponent } from './main-body-home/main-body-home.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { ProfileCardComponent } from './profilePage/profile-card/profile-card.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';

export const routes: Routes = [
    { path: '', component: MainBodyHomeComponent },
    {path:'login',component: LoginContainerComponent},
    {path:'patinetProfile',component: ProfileCardComponent},
    {path:'patinetHistory',component:PatientHistoryComponent}
];
