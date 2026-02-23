import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust the path as necessary
import { MatCardModule  } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-success',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss']
})

export class LoginSuccessComponent implements OnInit {

constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      if (token) {
        localStorage.setItem('token', token); // Store JWT

        // Fetch user details to determine role
        this.authService.getUserInfo().subscribe({
          next: (user) => {
            if (user && user.role === 'ROLE_GAMEMASTER') {
              this.router.navigate(['/admin/dashboard']); // Redirect Admin
            } else {
              this.router.navigate(['/player/quizzes']); // Redirect Player
            }
          },
          error: (err) => {
            console.error('Failed to fetch user info', err);
            this.router.navigate(['/login']);
          }
        });
      }
    });
  }
}