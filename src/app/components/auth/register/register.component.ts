import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { ComunicationService } from '../../../services/dialog/comunication.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public repeatedEmail: boolean = false;

  registerForm = new FormGroup({
    name: new FormControl ('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email],),
    password: new FormControl('', [Validators.required,])
  })

  constructor (
    public usersService: UsersService,
    public dialogService: ComunicationService,

  ){}

  public register(){

    if(this.registerForm.valid){
      let formData = this.registerForm.value;
      //check para comprobar si el email ya se ha usado anteriormente.
      this.usersService.isEmailRegistered(formData.email!).subscribe(
        isRegistered => {
          if(!isRegistered){
            this.repeatedEmail = false;
            this.usersService.register(JSON.stringify(formData))
              .subscribe({
                next: (res) => {
                  this.usersService.updateUser(res.accessToken!);
                },
                error: e => console.log(e)
              });
          }else{
            this.repeatedEmail = true;
          }
        }
      )
    }
  }

}
