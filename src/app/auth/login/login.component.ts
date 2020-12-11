import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { NzMessageService } from 'ng-zorro-antd/message';

import { AuthService } from "../auth.service";
import { SessionService } from "../session.service";
import { StorageService } from '../storage.service';

import { parseToken } from '../../app.utility';
import { email, slug } from "../../app.regex";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  static title: string = 'Login';

  config: {step: string, useDifferent: boolean, loading: boolean} = {
    step: 'workspace',
    useDifferent: false,
    loading: false
  }

  loginForm: FormGroup = new FormGroup({
    workspace: new FormControl("", [Validators.required, Validators.pattern(slug), Validators.maxLength(32)]),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern(email),
    ]),
    password: new FormControl("", [Validators.required]),
    remember: new FormControl(false)
  });

  rememberd: {ids: Array<string>, accounts: any} = {
    ids: [],
    accounts: {}
  };

  workspace: any = {};

  constructor(
    private auth: AuthService, 
    private session: SessionService, 
    private storage: StorageService,
    private toast: NzMessageService
  ) {}

  ngOnInit(): void {
    document.body.classList.add('auth-bg');
    
    this.rememberd.accounts = this.storage.get('_accounts', 'localStorage') || {};
    this.rememberd.ids = Object.keys(this.rememberd.accounts);
  }

  continue(step: string) {
    this.config.step = step;

    if(step === 'account') {
      this.config.loading = true;
      this.auth.workspace(this.loginForm.get('workspace').value).subscribe((response: any) => {
        if(!response.status) {
          return this.toast.error(response.message);
        }

        this.workspace = response;
        this.loginForm.get('workspace').setValue(response.slug);
        this.config.loading = false;
      }, (error) => {
        this.config.loading = false;
      });
    }
  }

  login() {
    if(!this.loginForm.valid) {
      return false;
    }
    
    this.config.loading = true;
    this.auth.login(this.loginForm.getRawValue()).subscribe((res: any) => {
      if (res.id) {
        this.session.afterLogin();
        this.config.loading = true;
        
        if(this.loginForm.get('remember').value) {
          this._remember(this.session.token);
        }
      }
    }, (error) => {
      this.toast.error('Something went wrong, please try later.');
      this.config.loading = false;
    });
  }

  loginViaToken(id: string) {
    const account: any = this.rememberd.accounts[id];

    if(!account) {
      this.toast.error('User not found.');
      this.remove(id);
      
      return this.config.useDifferent = true;
    }

    if(this.isExpired(account.token)) {
      // set form values
    }

    this.storage.set('_token', account.token);
    this.storage.set('_user', account.user);
    this.session.afterLogin();
  }

  remove(id: string, event: MouseEvent = null) {

    if(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    delete this.rememberd.accounts[id];
    
    this._refresh();
  }

  useDifferent() {
    this.config.useDifferent = true;
  }

  private _remember(token: string) {
    const parsed: any = parseToken(token);
    console.log(parsed);

    this.rememberd.accounts[parsed.user.id] = {
      user: parsed.user,
      expiry: parsed.exp,
      token
    }

    this._refresh();
  }

  private _refresh() {
    this.storage.set('_accounts', this.rememberd.accounts, 'localStorage');
    this.rememberd.ids = Object.keys(this.rememberd.accounts);
  }

  isExpired(expiry: number) { 
    return Date.now() > expiry * 1000;
  }
}
