import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../state.service';
// import jwt from 'jsonwebtoken';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private state: StateService
  ) {}

  login() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe((res) => {
        localStorage.setItem('token', res.data.token);
        // const decoded = jwt.decode(res.data.token);
        if (res.success) {
          // this.state.$state.set({
          //   _id: decoded?._id,
          //   fullname: decoded?.fullname,
          //   email: decoded?.email,
          //   jwt: res.data.token,
          // });
          this.router.navigate(['/diaries']);
        } else {
          alert(res.message);
        }
      });
  }
}
