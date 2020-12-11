import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";

import { UserComponent } from './user/user.component';
import { HeadModule } from '../shared/head/head.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FilterModule } from "../shared/filter/filter.module";

const routes: Routes = [{
  path: '',
  component: UserComponent,
  data: {
    title: 'Users'
  }
}];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeadModule,
    NzButtonModule,
    NzDrawerModule,
    NzInputModule,
    NzMessageModule,
    ReactiveFormsModule,
    FormsModule,
    NzRadioModule,
    NzToolTipModule,
    FilterModule,
  ],
})
export class UserModule {}
