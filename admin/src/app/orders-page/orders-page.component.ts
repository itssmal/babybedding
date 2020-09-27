import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MaterialService} from "../shared/services/material.service";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {OrdersService} from "../shared/services/orders.service";
import {Observable} from "rxjs";
import {Message, Order, Position} from "../shared/interfaces";
import {PositionsService} from "../shared/services/position.service";


@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OrdersPageComponent implements OnInit, AfterViewInit {

  @ViewChild('floatingBtn') floatingRef: ElementRef

  orders$: Observable<Order[]>
  orders: Order[]
  order: Order
  done: boolean
  canEdit = false
  canDelete = false
  fullOrder = []
  testOrders = []
  imgPrevs= []
  constructor(private ordersService: OrdersService,
              private positionsService: PositionsService) {
  }

  ngOnInit() {
    // this.ordersService.fetch()
    //   .subscribe(
    //     res => {
    //       this.testOrders = res
    //     }
    //   )
    this.ordersService.fetch()
      .subscribe(res => {
        this.orders = res
      })
  }

  ngAfterViewInit() {
  }

  onDone(id: string) {
    this.done = true
    this.ordersService.update(id, {done: this.done})
      .subscribe(
        (res) => {
          this.orders$ = this.ordersService.fetch()
          console.log(res)
        },
        error1 => window.alert(error1.error.message),
        () => {this.ordersService.fetch()}
      )
  }

  onUndone(id: string) {
    this.done = false
    this.ordersService.update(id, {done: this.done})
      .subscribe(
        (res) => {
          this.orders$ = this.ordersService.fetch()
          console.log(res)
        },
        error1 => window.alert(error1.error.message),
        () => {this.ordersService.fetch()}
      )
  }

  onDelete(id: string) {
    const decision = window.confirm('Ви точно хочете видалити замовлення?')
    if (decision) {
      this.ordersService.remove(id)
        .subscribe(
          (res) => {
            // const test = this.testOrders.filter(i => i._id !== id)
            // this.testOrders = [...test]
            // console.log(test)
            this.ordersService.fetch()
            window.alert(res.message)
          },
          error1 => window.alert(error1.error.message),
          () => {
            this.ordersService.fetch()
              .subscribe(res => this.orders = res)
          }
        )
    }
  }

  showMore(i: number, positions) {
    const showInfo = false
    this.fullOrder.push(showInfo)
    this.fullOrder[i] = !this.fullOrder[i]
    positions.forEach((pos, a) => {
      this.positionsService.fetchOne(pos.positionId)
        .subscribe(
          position => {
            this.orders[i].positions[a].imgPrev = position.images[position.mainImageId].imageSrc
          }
        )
    })
  }
}
