import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { HttpService } from 'src/app/shared/services/http-service/http.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  users: User[] = [];
  loginForm!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.http.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onLogin(): void {
    const fullUserData = this.getFullUserData();

    if (fullUserData) {
      this.router.navigate(['home']);
      this.authService.setCurrentUser(fullUserData);
    } else {
      this.snackBar.open('Invalid credentials', 'Close');
    }
  }

  private getFullUserData(): User | undefined {
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    return this.users.find(
      (user) => user.email === email && user.password === password
    );
  }

  private createForm(): void {
    this.loginForm = this.builder.group({
      email: this.builder.control('', [Validators.required]),
      password: this.builder.control('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
    });
  }
}
