import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [CustomerComponent],
  imports: [CommonModule, CoreModule],
})
export class CustomerModule {}
