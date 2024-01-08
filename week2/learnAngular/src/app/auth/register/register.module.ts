import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { AuthGuard } from '../auth.guard';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, FormsModule, RegisterRoutingModule],
  providers: [AuthGuard],
})
export class RegisterModule {}
