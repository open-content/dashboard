import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from './date/date.pipe';



@NgModule({
  declarations: [
    DatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatePipe
  ]
})
export class PipeModule { }
