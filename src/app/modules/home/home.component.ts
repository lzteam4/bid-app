import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { IUser } from '../../entities';
import { UserService, AuthenticationService } from '../../services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    pageTitle = "Home";
    currentUser: IUser;
    currentUserSubscription: Subscription;
    users: IUser[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        //this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

}