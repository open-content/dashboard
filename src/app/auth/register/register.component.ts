import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { NzMessageService } from "ng-zorro-antd/message";

import { AuthService } from "../auth.service";

import { alpha, email, slug } from "../../app.regex";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.pattern(email),
    ], this.checkEmail.bind(this)),
    workspace: new FormControl("", [
      Validators.required,
      Validators.pattern(slug),
    ], this.checkWorkspace.bind(this)),
    firstName: new FormControl("", [Validators.required, Validators.pattern(alpha)]),
    lastName: new FormControl("", [Validators.required, Validators.pattern(alpha)]),
    password: new FormControl("", [Validators.required])
  });

  step: string = 'email';
  loading: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: NzMessageService
  ) {}

  ngOnInit(): void {
    document.body.classList.add('auth-bg');
  }

  continue(step: string) {
    this.step = step;
  }

  register() {
    if  (!this.registerForm.valid) {
      return;
    }

    this.loading = true;
    this.auth.register(this.registerForm.getRawValue()).subscribe((res: any) => {
      this.loading = false;
      this.toast.success("Thank You! Registration successfull.");
      this.toast.loading("Redirecting you to login.", { nzDuration: 1000});
      
      setTimeout(() => {
        this.router.navigate(["/auth/login"]);
      }, 1000);
    }, (error: any) => {
      this.loading = false;
      this.toast.error("Something went wrong, please try later.");
    });
  }

  private checkEmail(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.auth.email(control.value).pipe(
      map((res: any) => res ? { exists: true} : null),
      catchError(() => of(null))
    );
  }

  private checkWorkspace(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.auth.workspace(control.value).pipe(
      map((res: any) => res ? { exists: true} : null),
      catchError(() => of(null))
    );
  }
}
