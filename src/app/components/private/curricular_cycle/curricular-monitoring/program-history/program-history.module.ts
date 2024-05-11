import { NgModule } from '@angular/core';
import { ProgramHistoryComponent } from './program-history.component';
import { ProgramHistoryRoutingModule } from './program-history-routing.module';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProgramHistoryComponent],
  imports: [
    ProgramHistoryRoutingModule,
    DialogModule,
    TableModule,
    CommonModule,
    NgxDocViewerModule,
    SharedModule,
  ],
  exports: [ProgramHistoryComponent],
})
export class ProgramHistoryModule {}
