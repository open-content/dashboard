import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";

import { CategoryComponent } from './category/category.component';
import { HeadModule } from "../shared/head/head.module";
import { FilterModule } from "../shared/filter/filter.module";

const routes: Routes = [{
  path: '',
  component: CategoryComponent,
  data: {
    title: 'Categories'
  }
}];

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzButtonModule,
    NzDrawerModule,
    NzInputModule,
    HeadModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzToolTipModule,
    FilterModule,
    FormsModule,
  ],
})
export class CategoryModule {}
