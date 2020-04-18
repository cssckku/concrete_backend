import { CustomFormsModule } from 'ng2-validation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent, NgbdModalContent } from './team.component';

@NgModule({
 
  entryComponents:[NgbdModalContent],
  declarations: [TeamComponent,NgbdModalContent],
  imports: [
    CustomFormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule.forRoot(),
    FormsModule
  ]
})

export class TeamModule { }
