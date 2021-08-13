import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private userSub: any;
  user: User;
  warning: any;
  loading: boolean = false;

  constructor(private as: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = { _id: null, userName: '', password: '' };
  }

  onSubmit() {
    if (this.user.userName !== '' && this.user.password !== '') {
      this.loading = true;
      this.userSub = this.as.login(this.user).subscribe(
        (success) => {
          this.loading = false;
          localStorage.setItem('access_token', success.token);
          this.router.navigate(['/newReleases']);
        },
        (err) => {
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    } else {
      this.warning = 'Username and Password are wrong or missing!';
    }
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
}
