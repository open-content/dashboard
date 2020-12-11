import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';

import { InfopanelComponent } from './infopanel/infopanel.component';



@NgModule({
  declarations: [InfopanelComponent],
  imports: [
    CommonModule,
    NgScrollbarModule
  ],
  exports: [
    InfopanelComponent
  ],
  providers: [{
    provide: NG_SCROLLBAR_OPTIONS,
    useValue: {
      visibility: 'hover',
      appearance: 'compact'
    }
  }]
})
export class InfopanelModule { }
