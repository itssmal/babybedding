import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PositionsService} from "../../shared/services/positions.service";
import {Position} from "../../shared/interfaces";
import {CartService} from "../../shared/services/cart.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-position-view-page',
  templateUrl: './position-view-page.component.html',
  styleUrls: ['./position-view-page.component.css']
})
export class PositionViewPageComponent implements OnInit {

  positionId: string
  position: Position
  isPaymentCollapsed = true
  isDeliveryCollapsed = true
  isInfoCollapsed = true

  constructor(private route: ActivatedRoute,
              private positionsService: PositionsService,
              private cartService: CartService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => this.positionId = params['id']
    )

    this.positionsService.getById(this.positionId)
      .subscribe(
        position => {
          this.position = position
        },
        error => {
          this.toastr.error(error.error.message,'Помилка!', {
            timeOut: 5000,
            toastClass: 'toast',
            titleClass: 'toast-header',
            messageClass: 'toast-body'
          })
        }
      )
  }

  onAdd(id: string) {
    this.cartService.addToCart(id)
    this.toastr.success('Можете продовжувати покупки', 'Додано в Кошик!', {
      timeOut: 2000,
      toastClass: 'toast',
      titleClass: 'toast-header',
      messageClass: 'toast-body'
    });
  }
}
