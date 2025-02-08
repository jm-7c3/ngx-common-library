import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@NgModule({
  providers: [
    ConfirmationService,
    DialogService,
    DynamicDialogConfig,
    MessageService,
  ]
})
export class CommonLibModule { }
