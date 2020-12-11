import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: 'Register'
    }
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzToolTipModule
  ],
})
export class AuthModule {}
