import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Position} from "../shared/interfaces";
import {PositionsService} from "../shared/services/positions.service";
import {ActivatedRoute, Params} from "@angular/router";
import {CartService} from "../shared/services/cart.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-positions-page',
  templateUrl: './positions-page.component.html',
  styleUrls: ['./positions-page.component.css']
})
export class PositionsPageComponent implements OnInit {

  categoryId: string
  catName: string
  positions$: Observable<Position[]>
  positions: Position[] = []
  count: number = 0

  constructor(private positionsService: PositionsService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = params['id']
      }
    )
    this.catName = history.state.catName
    this.positions$ = this.positionsService.getByCategoryId(this.categoryId)
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
