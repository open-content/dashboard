import { Component, OnInit } from '@angular/core';

import { SessionService } from "src/app/auth/session.service";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.scss"]
})
export class SettingComponent implements OnInit {
  constructor(
    private session: SessionService
  ) {}

  user: any;
  editing: boolean = false;

  ngOnInit(): void {
    this.user = this.session.user;

    console.log(this.user);
  }

  editSetting(type: string) {
    
  }
}
