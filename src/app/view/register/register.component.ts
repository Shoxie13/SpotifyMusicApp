import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { RegisterUser } from 'src/app/RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private registerSub: any;

  registerUser: RegisterUser;

  warning: any;
  success: boolean = false;
  loading: boolean = false;

  constructor(private as: AuthService) {}

  ngOnInit(): void {
    this.registerUser = { userName: '', password: '', password2: '' };
  }

  onSubmit() {
    if (
      this.registerUser.userName !== '' &&
      this.registerUser.password === this.registerUser.password2
    ) {
      this.loading = true;

      this.registerSub = this.as.register(this.registerUser).subscribe(
        (success) => {
          this.loading = false;
          this.warning = null;
          this.success = true;
        },
        (err) => {
          this.loading = false;
          this.warning = err.error.message;
          this.success = false;
        }
      );
    } else {
      this.warning = 'Passwords do not match';
    }
  }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();
  }
}
