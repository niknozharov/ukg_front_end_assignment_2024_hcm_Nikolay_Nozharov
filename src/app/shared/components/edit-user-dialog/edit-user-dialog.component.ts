import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.model';
import { HttpService } from '../../services/http-service/http.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
})
export class EditUserDialogComponent {
  employeeForm!: FormGroup;

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      company: [this.data.company, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      address: [this.data.address],
      role: [this.data.role, Validators.required],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const controls = this.employeeForm.controls;
      const updatedUser = {
        ...this.data,
        company: controls.company.value,
        email: controls.email.value,
        address: controls.address.value,
        role: controls.role.value,
      };
      this.http.editUser(updatedUser).subscribe((res) => {
        this.dialogRef.close(res);
      });
    } else {
      // Form is invalid, mark fields as touched to show errors
      Object.keys(this.employeeForm.controls).forEach((field) => {
        const control = this.employeeForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
