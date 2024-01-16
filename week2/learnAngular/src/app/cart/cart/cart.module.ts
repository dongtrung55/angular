import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { AuthGuard } from '../../auth/auth.guard';
import { CartService } from './cart.service';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, CartRoutingModule, FormsModule],
  providers: [AuthGuard, CartService],
})
export class CartModule {}
