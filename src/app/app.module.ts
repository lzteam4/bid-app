import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';

import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AlertComponent } from '../app/modules/shared/alert.component';
import {  ErrorInterceptor } from '../app/helpers/error.interceptor';
import { JwtInterceptor } from '../app/helpers/jwt.interceptor';
import { HomeComponent } from '../app/modules/home/home.component';
import { LoginComponent } from '../app/modules/auth/login/login.component';
import { RegisterComponent } from '../app/modules/auth/register/register.component';

// used to create fake backend
import { fakeBackendProvider } from '../app/helpers/fake-backend';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastModule
  ],
  providers: [MessageService,  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
