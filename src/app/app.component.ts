import { Component, OnInit } from '@angular/core';
import { FirebaseCloudMessagingService, AuthenticationService } from './services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pageTitle = 'XP Bid Dash';
  loginLabel = 'Login';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private firebaseCloudMessagingService: FirebaseCloudMessagingService,
    private messageService: MessageService) {

    if (this.authenticationService.currentUserValue) {
      this.firebaseCloudMessagingService.requestPermission();
      this.firebaseCloudMessagingService.receiveMessage().subscribe(payload => {
        this.messageService.add({ severity: 'success', summary: payload["notification"]["title"], detail: payload["notification"]["body"] });
      });
    }
  }

  ngOnInit()
  {
    if (this.authenticationService.currentUserValue) {
      // authorised so return true
      this.loginLabel === 'Logout';
    }
    else {
      this.loginLabel === 'Login';
    }
  }

  logout() {
  
    if (this.authenticationService.currentUserValue) {
      // authorised so return true
      this.loginLabel === 'Logout';
    }
    else {
      this.loginLabel === 'Login';
    }
  }
}
