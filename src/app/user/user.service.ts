import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { query } from "../app.utility";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private base: string = `${environment.base}/users`;

  constructor(private http: HttpClient) {}

  all(params: any = {}) {
    const q: string = query(params);

    return this.http.get(q ? `${this.base}?${q}` : `${this.base}`);
  }

  one(id: string) {
    return this.http.get(`${this.base}/${id}`);
  }

  create(user: any) {
    return this.http.post(this.base, user);
  }

  update(id: string, user: any) {
    return this.http.put(`${this.base}/${id}`, user);
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
