import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/modules/home/home.component';
import { LoginComponent } from '../app/modules/auth/login/login.component';
import { RegisterComponent } from '../app/modules/auth/register/register.component';
import { AuthGuard } from '../app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    loadChildren: '../app/modules/profile/profile.module#ProfileModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'products',
   loadChildren: '../app/modules/product/product.module#ProductModule',
   canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

// const routes: Routes = [
//   {
//     path: 'auth',
//     loadChildren: '../app/modules/auth/auth.module#AuthModule'
//   },
//   {
//     path: 'profile',
//     loadChildren: '../app/modules/profile/profile.module#ProfileModule'
//   },
//   { 
//     path: 'products',
//    loadChildren: '../app/modules/product/product.module#ProductModule'
//   },
//   {
//     path: '',
//     redirectTo: '',
//     pathMatch: 'full'
//   }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
