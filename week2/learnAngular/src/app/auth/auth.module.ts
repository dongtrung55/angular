import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



@NgModule({
  declarations: [
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
