import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";

import { HeadModule } from "../shared/head/head.module";
import { StoryComponent } from "./story/story.component";
import { CreateStoryComponent } from "./create-story/create-story.component";
import { PipeModule } from "../shared/pipe/pipe.module";
import { EmptyModule } from "../shared/empty/empty.module";
import { FilterModule } from "../shared/filter/filter.module";
import { GalleryModalModule } from '../shared/gallery-modal/gallery-modal.module';

const routes: Routes = [
  {
    path: "",
    component: StoryComponent,
    data: {
      title: 'Stories'
    }
  },
  {
    path: ":id",
    component: CreateStoryComponent,
    data: {
      title: 'Stories',
      noSidebar: true
    }
  },
];

@NgModule({
  declarations: [StoryComponent, CreateStoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeadModule,
    FormsModule,
    NzButtonModule,
    NzDropDownModule,
    PipeModule,
    NzModalModule,
    NzMessageModule,
    EmptyModule,
    FilterModule,
    GalleryModalModule,
    ReactiveFormsModule,
    NzDrawerModule,
    NzInputModule,
    NzSelectModule
  ]
})
export class StoryModule {}
