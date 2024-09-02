import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [NzFormModule, NzInputModule,NzButtonModule, ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {
  isAuth?: boolean;
  formLogin = new FormGroup({
    name: new FormControl('', Validators.required ),
    password: new FormControl('', Validators.required)
  })

constructor(private readonly authService: AuthService){

}
  public submitForm(){
    this.authService.login(this.formLogin.value)
  }
}
