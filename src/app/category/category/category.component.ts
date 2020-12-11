import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { name, slug } from '../../app.regex';
import { toSlug } from '../../app.utility';

import { CategoryService } from "../category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {  
  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl("", [Validators.required, Validators.pattern(name)]),
    slug: new FormControl("", [Validators.required, Validators.pattern(slug)]),
    description: new FormControl("")
  });

  params: any = { by: undefined, q: undefined };

  categories: Array<any> = [];

  private drawerRef: NzDrawerRef;

  @ViewChild('addCategory') addCategory: TemplateRef<any>;

  constructor(
    private category: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private drawer: NzDrawerService,
    private toast: NzMessageService
  ) {}

  private _all(params: any = {}) {
    this.category.all(params).subscribe((result: any) => {
      this.categories = result.rows;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.params = {
        q: params.q,
        by: params.by,
      };
      
      this._all(this.params);
    });

    this.categoryForm.get('name').valueChanges.subscribe((value: string) => {
      const slug: AbstractControl = this.categoryForm.get('slug');
      
      if(!slug.dirty) {
        slug.setValue(toSlug(value));
      }
    });
  }

  changeType(by: string = undefined) {
    this.params.by = by;

    if (this.params.by || this.params.q) {
      return this.router.navigate(["/categories"], { queryParams: this.params });
    }

    this.router.navigate(["/categories"]);
  }

  onSearch(clear: boolean = false) {
    if (clear) {
      this.params.q = undefined;
      return this.router.navigate(["/categories"], { queryParams: this.params });
    }

    if (this.params.q || this.params.by) {
      return this.router.navigate(["/categories"], { queryParams: this.params });
    }

    this.router.navigate(["/categories"]);
  }

  openDrawer() {
    this.drawerRef = this.drawer.create({
      nzContent: this.addCategory,
      nzClosable: false,
      nzMaskClosable: false
    })
  }

  closeDrawer() {
    this.drawerRef.close();
  }

  edit(category: any) {

    this.categoryForm.setValue({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description
    });

    this.openDrawer();
  }

  saveCategory() {
    if(!this.categoryForm.valid) {
      return;
    }

    const {id, ...rest} = this.categoryForm.getRawValue();

    if(id) {
      return this.category.update(id, rest).subscribe((category: any) => {
        const index: number = this.categories.findIndex((cat: any) => cat.id === id);
        this.categories[index] = {
          ...category,
          id
        }
        this.toast.success('Category updated successfully.');
        this.drawerRef.close();
        this.categoryForm.reset();
      });
    }

    this.category.create(rest).subscribe((category: any) => {
      this.toast.success('Category addedd successfully.');
      this.categories.unshift(category);
      this.drawerRef.close();
      this.categoryForm.reset();
    });
  }


}
