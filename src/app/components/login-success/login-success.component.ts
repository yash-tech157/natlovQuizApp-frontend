import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-success',
  template: `<p>Login successful...</p>`
})
export class LoginSuccessComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) {}

 ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const token = params['token'];

    if (token) {
      localStorage.setItem('token', token);

      // Redirect to quiz page
      this.router.navigate(['/player']);
    }
  });
}

}
