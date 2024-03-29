import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { EditUserDialogComponent } from 'src/app/shared/components/edit-user-dialog/edit-user-dialog.component';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { HttpService } from 'src/app/shared/services/http-service/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'gender', 'email', 'company'];
  dataSource: User[] = [];
  isAdmin: boolean = false;

  constructor(
    private http: HttpService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchUsersData();
    this.addColumnsForAdmin();
  }

  deleteUser(user: User) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Delete selected user',
          content: `Confirm deletion of ${user.name}`,
        },
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this.http.deleteUser(user.id).subscribe((res) => {
            this.dataSource = this.dataSource.filter(
              (user) => user.id !== res.id
            );
          });
        }
      });
  }

  editUser(user: User) {
    this.dialog
      .open(EditUserDialogComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe(() => {
        this.fetchUsersData();
      });
  }

  private fetchUsersData(): void {
    this.http.getUsers().subscribe({
      next: (users: User[]) => {
        this.dataSource = users;
      },
      error: () => {},
    });
  }

  private addColumnsForAdmin(): void {
    this.isAdmin = this.authService.isUserAdmin();
    if (this.authService.isUserAdmin()) {
      this.displayedColumns.push('phone', 'actions');
    }
  }
}
