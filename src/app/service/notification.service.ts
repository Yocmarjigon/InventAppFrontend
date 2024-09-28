import { forwardRef, Inject, Injectable } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
private notification: NzNotificationService,

  ) { }

   public notificationOpen(title: string, description: string, color: string) {
    this.notification.blank(
      title,
      description,
      {
        nzStyle: {
          width: '600px',
          marginLeft: '-265px',
          backgroundColor: color,
          color: ''
        },
        nzClass: 'test-class',
      }
    );
  }

}
