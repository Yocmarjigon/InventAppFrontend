import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { AuthService } from '../../../service/auth.service';
@Component({
  selector: 'app-private',
  standalone: true,
  imports: [NzLayoutModule, RouterModule, NzIconModule, NzMenuModule, NzButtonModule, NzSpaceModule],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss'
})
export class PrivateComponent {
  isCollapsed = false;

  constructor(
    private readonly authService: AuthService
  ){

  }
  public logout(){
    this.authService.logout()
  }

}
