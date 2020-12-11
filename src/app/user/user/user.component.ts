import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { email, name } from '../../app.regex';
import { UserService } from '../user.service';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  params: any = { type: undefined, q: undefined };

  users: Array<any> = [];

  userForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl('', [Validators.required, Validators.pattern(name)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(name)]),
    email: new FormControl('', [Validators.required, Validators.pattern(email)]),
    password: new FormControl('', [Validators.required]),
    location: new FormControl(''),
    bio: new FormControl(''),
    role: new FormControl('user')
  });

  sticky: boolean = false;

  private drawerRef: NzDrawerRef;

  @ViewChild('addUser') addUser: TemplateRef<any>;

  constructor(
    private user: UserService,
    private route: ActivatedRoute,
    private drawer: NzDrawerService,
    private toast: NzMessageService,
    private router: Router
  ) {}

  private _all(params: any = {}) {
    this.user.all(params).subscribe((result: any) => {
      this.users = result.rows;
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.params = {
        q: params.q,
        type: params.type,
      };
      
      this._all(this.params);
    })
  }

  changeType(type: string = undefined) {
    this.params.type = type;

    if (this.params.type || this.params.q) {
      return this.router.navigate(["/users"], { queryParams: this.params });
    }

    this.router.navigate(["/users"]);
  }

  onSearch(clear: boolean = false) {
    if (clear) {
      this.params.q = undefined;
      return this.router.navigate(["/users"], { queryParams: this.params });
    }

    if (this.params.q || this.params.type) {
      return this.router.navigate(["/users"], { queryParams: this.params });
    }

    this.router.navigate(["/users"]);
  }

  edit(user: any) {
    this.userForm.removeControl('password');
    this.userForm.setValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      location: user.location,
      bio: user.bio
    });

    this.openDrawer(true);
  }

  openDrawer(fromEdit: boolean = false) {
    this.userForm.get('role').setValue('user');
    
    if(!fromEdit) {
      this.userForm.addControl('password', new FormControl('', [Validators.required]));
    }
    this.drawerRef = this.drawer.create({
      nzContent: this.addUser,
      nzClosable: false,
      nzMaskClosable: false
    })
  }

  closeDrawer() {
    this.drawerRef.close();
  }

  saveUser() {
    if(!this.userForm.valid) {
      return;
    }

    const { id, ...rest} = this.userForm.getRawValue();

    if(id) {
      return this.user.update(id, rest).subscribe((user: any) => {
        const index: number = this.users.findIndex((usr: any) => usr.id === id);
        this.users[index] = {
          ...user,
          id
        }
        this.toast.success('User updated successfully.');
        this.drawerRef.close();
        this.userForm.reset();
      });
    }

    this.user.create({...rest, status: true}).subscribe((user: any) => {
      this.toast.success('User addedd successfully.');
      this.users.unshift(user);
      this.drawerRef.close();
      this.userForm.reset();
    })
  }
}
