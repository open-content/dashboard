import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { EmptyModule } from '../empty/empty.module';

import { GalleryModalComponent } from './gallery-modal/gallery-modal.component';



@NgModule({
  declarations: [GalleryModalComponent],
  imports: [
    CommonModule,
    NgScrollbarModule,
    NzToolTipModule,
    EmptyModule,
    FormsModule,
    NzButtonModule,
    NzPopconfirmModule
  ],
  exports: [GalleryModalComponent],
  providers: [{
    provide: NG_SCROLLBAR_OPTIONS,
    useValue: {
      visibility: 'hover',
      appearance: 'compact'
    }
  }]
})
export class GalleryModalModule { }
