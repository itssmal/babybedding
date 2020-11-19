import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Position} from "../shared/interfaces";
import {PositionsService} from "../shared/services/positions.service";
import {ActivatedRoute, Params} from "@angular/router";
import {CartService} from "../shared/services/cart.service";
import { ToastrService } from 'ngx-toastr';
import {CategoriesService} from "../shared/services/categories.service";

@Component({
  selector: 'app-positions-page',
  templateUrl: './positions-page.component.html',
  styleUrls: ['./positions-page.component.css']
})
export class PositionsPageComponent implements OnInit, OnDestroy {

  categoryId: string
  catName: string
  positions$: Observable<Position[]>
  positions: Position[] = []
  count: number = 0
  routeSub: Subscription

  constructor(private positionsService: PositionsService,
              private categoriesService: CategoriesService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params: Params) => {
        this.getInfo(params['id'])
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

  private async getInfo(categoryId: string) {
    this.catName = await this.categoriesService.getCategoryName(categoryId).toPromise()
    this.positions$ = this.positionsService.getByCategoryId(categoryId)
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe()
  }
}
