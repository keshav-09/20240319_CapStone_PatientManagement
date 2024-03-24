import { Component } from '@angular/core';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImageComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {

}
