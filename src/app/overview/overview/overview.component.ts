import { Component, OnInit } from '@angular/core';

import { SessionService } from "src/app/auth/session.service";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"]
})
export class OverviewComponent implements OnInit {
  constructor(private session: SessionService) {}

  user: any = this.session.user;

  ngOnInit(): void {}
}
