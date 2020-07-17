import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MainData} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class MainInfoService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<MainData[]> {
    return this.http.get<MainData[]>('/api/client-edit')
  }

}
