import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Position} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orderPosition: Position
  positions: Position[] = []
  sum: number
  positionDel: boolean

  constructor(private http: HttpClient) {
  }

  public getAreas(): Observable<any> {
    return this.http.post(
      environment.apiEndPoint,
      {
        "apiKey": environment.apiKey,
        "modelName": "Address",
        "calledMethod": "getAreas",
        "methodProperties": {}
      }
    )
  }

  public getCities(ref: string): Observable<any> {
    return this.http.post(
      environment.apiEndPoint,
      {
        "apiKey": environment.apiKey,
        "modelName": "Address",
        "calledMethod": "getCities",
        "methodProperties": {
          'AreaRef': ref
        }
      }
    )
  }

  public getDepartments(ref: string): Observable<any> {
    return this.http.post(
      environment.apiEndPoint,
      {
        "apiKey": environment.apiKey,
        "modelName": "AddressGeneral",
        "calledMethod": "getWarehouses",
        "methodProperties": {
          'CityRef': ref
        }
      }
    )
  }

  public sendEmail(url, data) {
    return this.http.post(url, data);
  }

  addToCart(id: string){
    this.http.get(`/api/position/${id}`)
      .subscribe(
        (position: Position) => {
          const candidate = this.positions.find(p => p._id === position._id)
          if (candidate) {
            candidate.quantity += 1
          } else {
            position.quantity = 1
            this.positions.push(position)
          }
        },
        error => {
          window.alert(error.error.message)
        },
        ()=> {
          this.calcSum()
        })
  }

  refreshCart(i: number, quantity: number) {
    if (quantity === 0) {
      this.positions.splice(i, 1)
      this.sum -= this.positions[i].cost
    } else {
      this.positions[i].quantity = quantity
      this.calcSum()
    }
  }

  remove(i: number) {
    this.positions.splice(i, 1)
    this.calcSum()
  }

  calcSum() {
    this.sum = this.positions.reduce((total, item)=>{
      return total += item.cost * item.quantity
    }, 0)
  }
}
