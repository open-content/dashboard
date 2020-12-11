import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-empty",
  templateUrl: "./empty.component.html",
  styleUrls: ["./empty.component.scss"],
})
export class EmptyComponent implements OnInit {
  @Input("title") title: string;
  @Input("description") description: string;
  @Input('loading') loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
