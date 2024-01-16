import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { AuthGuard } from '../../auth/auth.guard';
import { CartService } from '../cart/cart.service';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [CommonModule, CheckoutRoutingModule, FormsModule],
  providers: [AuthGuard, CartService],
})
export class CheckoutModule {}
