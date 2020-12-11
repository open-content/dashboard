import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { query } from "../app.utility";

@Injectable({
  providedIn: "root",
})
export class StoryService {
  private base: string = `${environment.base}/stories`;

  constructor(private http: HttpClient) {}

  all(params: any = {}): Observable<Array<any>> {
    const q: string = query(params);
    return this.http.get<Array<any>>(q ? `${this.base}?${q}` : `${this.base}`);
  }

  one(id: string): Observable<any> {
    return this.http.get(`${this.base}/${id}`);
  }

  create(story: any) {
    return this.http.post(this.base, story);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }

  save(story: any) {
    return this.http.post(`${this.base}/save`, story);
  }
}
