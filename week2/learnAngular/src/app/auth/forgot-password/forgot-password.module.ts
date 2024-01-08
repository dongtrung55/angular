import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthGuard } from '../auth.guard';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [CommonModule, FormsModule, ForgotPasswordRoutingModule],
  providers: [AuthGuard],
})
export class ForgotPasswordModule {}
