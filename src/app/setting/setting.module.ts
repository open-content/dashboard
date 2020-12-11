import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SettingComponent } from './setting/setting.component';
import { HeadModule } from '../shared/head/head.module';


const routes: Routes = [{
  path: '',
  component: SettingComponent,
  data: {
    title: 'Settings'
  }
}];

@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeadModule
  ]
})
export class SettingModule { }
