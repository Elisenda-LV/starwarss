import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../components/auth/login/login.component';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { Subscription } from 'rxjs';
import { routes } from '../../app.routes';
import { ComunicationService } from '../../services/dialog/comunication.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private subscription: Subscription;
  public userToken = this.usersService.userToken;

  public menuItems = routes
    .filter(route => route && route.path)
    .filter(route => route && !route.path?.includes(':'))
    .filter(route => route && !route.path?.includes('**'))
    .filter(route => route && !route.path?.includes('not-found'));

  constructor(public dialog: MatDialog, private dialogService: ComunicationService, public usersService: UsersService) {
    this.subscription = this.dialogService.closeDialog.subscribe(() => {
      this.dialog.closeAll();
    });
  }

  openLogIn(): void {
    this.dialog.open(LoginComponent);
  }

  openRegister(): void {
    this.dialog.open(RegisterComponent);
  }

  logout(): void {
    this.usersService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
