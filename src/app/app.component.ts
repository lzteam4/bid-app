import { Component } from '@angular/core';
import { FirebaseCloudMessagingService, AuthenticationService } from './services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageTitle = 'XP Bid Dash';
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

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
