import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadComponent } from './head/head.component';

@NgModule({
  declarations: [HeadComponent],
  imports: [
    CommonModule
  ],
  exports: [HeadComponent]
})
export class HeadModule { }
