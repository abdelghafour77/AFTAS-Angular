import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  public messages: string[] = [];

  public type: 'success' | 'warning' | 'error' = 'success';

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {

    this.notificationService.notification$.subscribe(
      (notification) => {
        if (notification) {
          this.messages = notification.messages;
          this.type = notification.type;
          // https://stackoverflow.com/questions/41106125/angular-2-using-this-inside-settimeout
          setTimeout(() => this.closeNotification(), 6000)
        }
      }
    )


  }

  closeNotification() {
    this.messages = [];
    this.type = 'success';
  }

}
