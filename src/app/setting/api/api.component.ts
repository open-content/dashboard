import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-api",
  templateUrl: "./api.component.html",
  styleUrls: ["./api.component.scss"]
})
export class ApiComponent implements OnInit {
  type: string;

  accessForm: FormGroup = new FormGroup({
    method: new FormControl("get", [Validators.required]),
    module: new FormControl("", [Validators.required])
  });

  domianForm: FormGroup = new FormGroup({
    protocol: new FormControl("https", [Validators.required]),
    domain: new FormControl("", [Validators.required])
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params.type;
  }

  submitForm(form: any) {
    console.log(form);
  }
}
