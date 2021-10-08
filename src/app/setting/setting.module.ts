import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSelectModule } from 'ng-zorro-antd/select';

import { SettingComponent } from './setting/setting.component';

import { HeadModule } from '../shared/head/head.module';
import { EditSettingComponent } from './edit-setting/edit-setting.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ProfileComponent } from './profile/profile.component';
import { ApiComponent } from './api/api.component';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  {
    path: "",
    component: SettingComponent,
    data: {
      title: "Settings"
    }
  },
  {
    path: "workspace/:type",
    component: WorkspaceComponent,
    data: {
      title: "Edit Workspace Details"
    }
  },
  {
    path: "profile/:type",
    component: ProfileComponent,
    data: {
      title: "Edit Profile Details"
    }
  },
  {
    path: "api/:type",
    component: ApiComponent,
    data: {
      title: "Edit API Details"
    }
  },
  {
    path: "account/:type",
    component: AccountComponent,
    data: {
      title: "Edit Account Details"
    }
  }
];

@NgModule({
  declarations: [
    SettingComponent, 
    EditSettingComponent, 
    WorkspaceComponent, 
    ProfileComponent, 
    ApiComponent, 
    AccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeadModule,
    NzSwitchModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SettingModule {}
