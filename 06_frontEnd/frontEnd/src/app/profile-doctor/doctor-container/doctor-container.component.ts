import { Component } from '@angular/core';
import { ImageDoctorComponent } from '../image-doctor/image-doctor.component';

@Component({
  selector: 'app-doctor-container',
  standalone: true,
  imports: [ImageDoctorComponent],
  templateUrl: './doctor-container.component.html',
  styleUrl: './doctor-container.component.css'
})
export class DoctorContainerComponent {

}
