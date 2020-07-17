import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Position} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor(private http: HttpClient) {
  }

  getByCategoryId(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/from-cat/${categoryId}`)
  }

  getById(id: string): Observable<Position> {
    return this.http.get<Position>(`/api/position/${id}`)
  }

}
