import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NzButtonModule } from "ng-zorro-antd/button";

import { HeadModule } from '../shared/head/head.module';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [{
  path: '',
  component: GalleryComponent,
  data: {
    title: 'Gallery'
  }
}];

@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeadModule,
    NzButtonModule
  ]
})
export class GalleryModule { }
