import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { query } from '../app.utility';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private base: string = `${environment.base}/media`;

  constructor(
    private http: HttpClient,
  ) { }

  all(params: any = {}) {
    const q: string = query(params);

    return this.http.get<Array<any>>(q ? `${this.base}?${q}` : `${this.base}`);
  }

  search(keyword: string, page: number) {
    const q: string = query({
      keyword,
      page
    });
    return this.http.get<Array<any>>(q ? `${this.base}/search?${q}` : `${this.base}/search`);
  }

  add(media: any) {
    return this.http.post(this.base, media);
  }

  copy(files: Array<any>) {
    return this.http.post(`${this.base}/copy`, files);
  }

  upload(media: any) {
    return this.http.post(`${this.base}/upload`, media);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
