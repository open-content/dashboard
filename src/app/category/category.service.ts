import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { query } from "../app.utility";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private base: string = `${environment.base}/categories`;

  constructor(private http: HttpClient) {}

  all(params: any = {}): Observable<Array<any>> {
    console.log(params);
    const q: string = query(params);
    return this.http.get<Array<any>>(q ? `${this.base}?${q}` : `${this.base}`);
  }

  one(id: string) {
    return this.http.get(`${this.base}/${id}`);
  }

  create(category: any) {
    return this.http.post(this.base, category);
  }

  update(id: string, data: any) {
    return this.http.put(`${this.base}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
