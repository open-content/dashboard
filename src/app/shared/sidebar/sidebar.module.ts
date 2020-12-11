import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzPopoverModule } from "ng-zorro-antd/popover";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";

import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzButtonModule,
    NzDropDownModule,
    NzPopoverModule,
    NzToolTipModule,
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
