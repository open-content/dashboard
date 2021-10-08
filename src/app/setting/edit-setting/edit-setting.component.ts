import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-edit-setting",
  templateUrl: "./edit-setting.component.html",
  styleUrls: ["./edit-setting.component.scss"]
})
export class EditSettingComponent implements OnInit {
  @Input("title") title: string = "No title";
  @Input("description") description: string;

  constructor() {}

  ngOnInit(): void {}
}
