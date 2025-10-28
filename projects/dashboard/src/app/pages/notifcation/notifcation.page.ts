import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NotificationProcessResponse, NotificationService } from './services/notification.service';
import { CreateNotificationPayload } from './dto/notification.dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifcation',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './notifcation.page.html',
  styleUrl: './notifcation.page.scss'
})
export class NotifcationPage implements OnInit, OnDestroy {

  notificationService = inject(NotificationService);

  notificationPayload:CreateNotificationPayload = {
    level:'info',
    title:'',
    message:''
  }

  feedback:Observable<NotificationProcessResponse> | null = null;

  send(){
    this.feedback = this.notificationService.create(this.notificationPayload)
  }

  ngOnInit(){
    console.log('initialize notification page');
    this.debounce(() => this.notificationService.read());
  }

  ngOnDestroy(){
    console.log('destroy notification page');
    clearTimeout(this.debounceTimer);
  }

  private debounceTimer: number | undefined; 
  private debounce( action:() => void ) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => { action() }, 1000);
  }

}
