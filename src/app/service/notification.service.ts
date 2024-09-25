import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private readonly notification: NzNotificationService
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
