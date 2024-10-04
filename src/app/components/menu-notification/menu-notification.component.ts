import { Component } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  selector: 'app-menu-notification',
  standalone: true,
  imports: [
    NzPopoverModule,
    NzBadgeModule,
    NzIconModule
  ],
  templateUrl: './menu-notification.component.html',
  styleUrl: './menu-notification.component.scss'
})
export class MenuNotificationComponent {

}
