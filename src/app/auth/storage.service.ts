import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key: string, value: any, type: string = 'sessionStorage') {
    if(typeof value !== 'string') {
      value = JSON.stringify(value);
    }

    window[type].setItem(key, value);
  }

  get(key: string, type: string = 'sessionStorage' ) {
    const value = window[type].getItem(key);
    
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  remove(key: string, type: string = 'sessionStorage') {
    window[type].removeItem(key);
  }

  destroy(type: string = 'sessionStorage') {
    window[type].clear();
  }
}
