import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order, OrderPosition} from "../interfaces";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
              private toastr: ToastrService) { }

  public sendEmail(url, data) {
    return this.http.post(url, data);
  }


  create(positions: OrderPosition[], sum: number, name: string, tel: string, email: string, area: string, city: string, department: string, notes: string): Observable<Order> {

    const body = {
      positions: positions,
      sum: sum,
      userName: name,
      userPhoneNumber: tel,
      userEmail: email,
      area: area,
      city: city,
      department: department,
      notes: notes
    }

    this.sendEmail('/sendMailToUser', body)
      .subscribe(
        data => {
          let res:any = data;
          this.toastr.success(res, 'Дякуємо!', {
            timeOut: 10000,
            toastClass: 'toast',
            titleClass: 'toast-header',
            messageClass: 'toast-body'
          })
        })
    return this.http.post<Order>('/api/order', body)
  }



}
