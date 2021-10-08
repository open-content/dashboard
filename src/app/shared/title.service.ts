import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: "root"
})
export class TitleService {
  private _base: string = "— Open CMS — Free Open Source CMS for Everyone";

  constructor(private title: Title) {}

  set(title: string) {
    this.title.setTitle(`${title} ${this._base}`);
  }

  get(): string {
    return this.title.getTitle();
  }
}
