import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { ComunicationService } from '../../../services/dialog/comunication.service';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public repeatedEmail: boolean = false;

  registerForm = new FormGroup({
    name: new FormControl ('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email],),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor (
    public usersService: UsersService,
    public dialogService: ComunicationService,
    public dialog: MatDialog,
  ){}

  public register(){

    if(this.registerForm.valid){
      let formData = this.registerForm.value;
      //check para comprobar si el email ya se ha usado anteriormente.
      this.usersService.isEmailRegistered(formData.email!).subscribe(
        isRegistered => {
          if(!isRegistered){
            this.repeatedEmail = false;
            this.usersService.users(JSON.stringify(formData))
              .subscribe({
                next: (res) => {
                  console.log(res);
                  this.closeDialog();
                  const loginData = { email: formData.email!, password: formData.password! };
                  this.usersService.users(JSON.stringify(loginData)).subscribe(
                    {
                      next: (res) => {
                        this.usersService.updateUser(res.accessToken!);
                      },
                      error: e => console.log(e)
                    });
                  },
                });

          }else{
            this.repeatedEmail = true;
          }
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogService.closeDialogFunction();
  }

  navigateToLogin(): void {
    this.closeDialog();
    this.dialog.open(LoginComponent);
  }

}
