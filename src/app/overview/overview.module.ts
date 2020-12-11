import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { HeadModule } from '../shared/head/head.module';

const routes: Routes = [{
  path: '',
  redirectTo: 'overview'
}, {
  path: 'overview',
  component: OverviewComponent,
  data: {
    title: 'Overview'
  }
}]

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeadModule
  ]
})
export class OverviewModule { }
