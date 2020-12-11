import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterComponent } from "./filter/filter.component";
import { StickyModule } from "../sticky/sticky.module";

@NgModule({
  declarations: [FilterComponent],
  imports: [CommonModule, StickyModule],
  exports: [FilterComponent],
})
export class FilterModule {}
