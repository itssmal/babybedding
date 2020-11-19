import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category')
  }

  getCategoryName(categoryId: string): Observable<any> {
    return this.http.get<any>(`/api/category/name/${categoryId}`)
  }
}
