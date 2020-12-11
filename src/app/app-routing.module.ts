import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./overview/overview.module").then((m) => m.OverviewModule),
    canActivate: [AuthGuard],
  },
  {
    path: "stories",
    loadChildren: () => import("./story/story.module").then((m) => m.StoryModule),
    canActivate: [AuthGuard],
  },
  {
    path: "categories",
    loadChildren: () =>
      import("./category/category.module").then((m) => m.CategoryModule),
    canActivate: [AuthGuard],
  },
  {
    path: "users",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: "gallery",
    loadChildren: () => import("./gallery/gallery.module").then((m) => m.GalleryModule),
    canActivate: [AuthGuard],
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./setting/setting.module").then((m) => m.SettingModule),
    canActivate: [AuthGuard],
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
