import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisingComponent } from './advertising.component';
/**
 * Modulo destinado a la funcionalidad de publicidad.
 */
@NgModule({
  declarations: [AdvertisingComponent],
  imports: [CommonModule],
  exports: [AdvertisingComponent],
})
export class AdvertisingModule {}
