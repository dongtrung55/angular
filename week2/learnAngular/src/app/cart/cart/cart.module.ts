import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { AuthGuard } from '../../auth/auth.guard';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, CartRoutingModule],
  providers: [AuthGuard],
})
export class CartModule {}
