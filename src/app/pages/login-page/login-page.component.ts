import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormLoginComponent } from '../../components/form-login/form-login.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NzFormModule, NzInputModule,NzButtonModule, ReactiveFormsModule, FormLoginComponent, ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  formLogin = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  })

  public submitForm(){


  }
}
