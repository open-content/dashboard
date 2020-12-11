import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  sticky: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onSticky(isSticky: boolean) {
    this.sticky = isSticky;
  }
}
