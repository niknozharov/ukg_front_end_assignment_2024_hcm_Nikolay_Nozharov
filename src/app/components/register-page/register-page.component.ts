import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { HttpService } from 'src/app/shared/services/http-service/http.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  users: User[] = [];
  registerForm!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpService
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

  onRegister(): void {
    if (this.isUserDuplicated()) {
      this.snackBar.open('User already exists', 'Close');
    } else {
      const lastUser = this.users[this.users.length - 1];
      const formValue = this.registerForm.value;
      const user = {
        id: Math.floor(Math.random() * 1000000000).toString(),
        index: lastUser.index + 1,
        name: formValue.name || '',
        gender: formValue.gender || '',
        company: '',
        email: formValue.email || '',
        phone: '',
        address: '',
        role: 'USER',
        password: formValue.password || '',
      };

      this.http.addUser(user).subscribe({
        next: () => {
          this.snackBar.open('Registration successful', 'Close');
          this.router.navigate(['login']);
        },
        error: () => {},
      });
    }
  }

  private isUserDuplicated(): boolean {
    const email = this.registerForm.controls.email.value;
    const name = this.registerForm.controls.name.value;

    return this.users.some((el) => el.email === email || el.name === name);
  }

  private createForm(): void {
    this.registerForm = this.builder.group({
      username: this.builder.control('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      name: this.builder.control('', Validators.required),
      password: this.builder.control('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      email: this.builder.control('', [Validators.required, Validators.email]),
      gender: this.builder.control('male'),
      role: this.builder.control('USER'),
    });
  }
}
