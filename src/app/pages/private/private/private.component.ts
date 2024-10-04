import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { AuthService } from '../../../service/auth.service';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { MenuNotificationComponent } from '../../../components/menu-notification/menu-notification.component';
@Component({
  selector: 'app-private',
  standalone: true,
  imports: [
    NzLayoutModule,
    RouterModule,
    NzIconModule,
    NzMenuModule,
    NzButtonModule,
    NzSpaceModule,
    NzFlexModule,
    NzBadgeModule,

    MenuNotificationComponent
  ],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss',
})
export class PrivateComponent {
  isCollapsed = false;

  constructor(private readonly authService: AuthService) {}
  public logout() {
    this.authService.logout();
  }

  public  res(){
    console.log("El Juan")
  }
}
