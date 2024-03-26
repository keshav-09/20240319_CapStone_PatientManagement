import { Component } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-main-body-home',
  standalone: true,
  imports: [],
  templateUrl: './main-body-home.component.html',
  styleUrl: './main-body-home.component.css'
})
export class MainBodyHomeComponent {
  constructor(private router: Router) {}

  taketologin() {
    this.router.navigate(['/login']);
  }

  
}
