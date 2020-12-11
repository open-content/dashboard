import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { userFromToken } from "../app.utility";
import { StorageService } from "./storage.service";

const TOKEN: string = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZTFkMDZmODUtN2M1ZC00MDAzLWEyYTktMGYzNWZlMDg1YmI0IiwiZmlyc3ROYW1lIjoiQXNob2siLCJsYXN0TmFtZSI6IlZpc2h3YWthcm1hIiwiZW1haWwiOiJha3Zsa29AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiYXZhdGFyIjoiaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzEzMTYzODY5MzQ3OTM1MzEzOTgvSkJIS1lsRVlfNDAweDQwMC5qcGcifSwiaWF0IjoxNjA2OTE1ODQyLCJleHAiOjE2MDY5MTk0NDIsImlzcyI6ImltcHVsc2l2ZXdlYiJ9.XKRm4TZRSEtJ6OpezGrWZLkAlI_YIfwe0VYMqk9nxcKak2ayvdvdqJXqvVXb8JNd7x62xaAE5ghWtAj1IkSu1OvyPJA5jcmSDHG0PaVBfXQTEEYmkhMrup9FTOn13VPnJt8SfM-RmsSPqjtieusLo5th2GaaukEYqZfeHMc002Y';

@Injectable({
  providedIn: "root",
})
export class SessionService {
  private _token: string;
  private _user: any;
  private _subject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private storage: StorageService, private router: Router) {}

  private _check() {
    const _token: string = this.storage.get("_token");

    if (!_token) {
      this._subject.next(false);
      return false;
    }

    this._token = _token;
    this._user = this.storage.get("_user");

    if (!this._user) {
      this._user = userFromToken(this._token);
      this.storage.set("_user", this._user);
    }

    this._subject.next(true);
    return true;
  }

  get token() {
    if (!this._token) {
      this._check();
    }

    return this._token;
  }

  set token(token: string) {
    this.storage.set("_token", token);
    this._token = token;
    this._user = userFromToken(this._token);
    this.storage.set("_user", this._user);
  }

  get user() {
    if (!this._user) {
      this._check();
    }

    return this._user;
  }

  afterLogin() {
    this._token = this.storage.get("_token");
    this._user = this.storage.get("_user");
    this._subject.next(true);
    this.router.navigate(["/"]);
    document.body.classList.remove('auth-bg');
  }

  destroy() {
    this.storage.destroy();
    this._user = null;
    this._token = null;
    this._subject.next(false);
  }

  logout() {
    this.destroy();
    this.router.navigate(["/auth/login"]);
  }

  subscribe(callback: Function) {
    return this._subject.subscribe((value: boolean) => {
      callback(value);
    });
  }
}
