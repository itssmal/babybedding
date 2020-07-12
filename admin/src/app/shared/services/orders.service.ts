import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, Order} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/admin-order')
  }

  update(id: string, data: {done: boolean}): Observable<Order> {
    return this.http.patch<Order>(`/api/admin-order/${id}`, data)
  }

  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/admin-order/${id}`)
  }

}
