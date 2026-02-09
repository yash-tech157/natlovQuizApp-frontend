import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module'; 
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './navbar.component.html', 
  styleUrl: './navbar.component.scss'

  
})


export class NavbarComponent {

  // constructor(public authService: AuthService) {}
  onLogout() {
    // Redirects to Spring Security default logout URL
    // After logout, Spring will redirect based on its configuration
    window.location.href = 'http://localhost:8080/logout';
  }

}