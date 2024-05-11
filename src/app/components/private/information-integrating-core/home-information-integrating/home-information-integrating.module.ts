import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageModule } from 'primeng/image';
import { HomeInformationIntegratingComponent } from './home-information-integrating.component';
import { HomeInformationIntegratingRoutingModule } from './home-information-integrating-routing.module';

@NgModule({
  declarations: [HomeInformationIntegratingComponent],
  imports: [CommonModule, HomeInformationIntegratingRoutingModule, SharedModule, ImageModule],
  exports: [HomeInformationIntegratingComponent],
})
export class HomeInformationIntegratingModule {}
