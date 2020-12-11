import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "src/app/auth/session.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  user: any;
  isVisible: boolean = false;

  constructor(private session: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.session.subscribe((loggedIn: any) => {
      if (loggedIn) {
        this.user = this.session.user;
      }
    });
  }

  logout() {
    this.session.logout();
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  settings() {
    this.isVisible = false;
    this.router.navigate(["/settings"]);
  }
}
