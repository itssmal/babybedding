import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order, OrderPosition} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public sendEmail(url, data) {
    return this.http.post(url, data);
  }


  create(positions: OrderPosition[], sum: number, name: string, tel: string, email: string, area: string, city: string, department: string): Observable<Order> {

    const body = {
      positions: positions,
      sum: sum,
      userName: name,
      userPhoneNumber: tel,
      userEmail: email,
      area: area,
      city: city,
      department: department
    }

    this.sendEmail("http://localhost:5000/sendmailToUser", body)
      .subscribe(
        data => {
          let res:any = data;
          console.log(
            `👏 > 👏 > 👏 > 👏 ${body.userName} is successfully register and mail has been sent and the message id is ${res.messageId}`
          );
        },
        err => {
          console.log(err);
        },() => {
          console.log('Success!')
        })

    return this.http.post<Order>('/api/order', body)
  }



}
