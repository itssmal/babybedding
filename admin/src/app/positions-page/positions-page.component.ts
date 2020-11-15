import {Component, OnInit} from '@angular/core';
import {PositionsService} from "../shared/services/position.service";
import {Position} from "../shared/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {MaterialService} from "../shared/services/material.service";

@Component({
  selector: 'app-positions-page',
  templateUrl: './positions-page.component.html',
  styleUrls: ['./positions-page.component.css']
})
export class PositionsPageComponent implements OnInit {

  positions: Position[]
  canDelete = false
  canEdit = false
  search: string = ''

  constructor(private positionsService: PositionsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    this.positionsService.fetchAll().subscribe(res => {
      this.positions = res
    })



    // this.route.params
    //   .pipe(
    //     switchMap(
    //       (params: Params) => {
    //         if (params['id']) {
    //           this.catId = params['id']
    //           this.loading = true
    //           this.newMode = false
    //           return this.positionsService.fetch(params['id'])
    //         } else {
    //           this.positions$ = this.positionsService.fetchAll()
    //         }
    //         return of(null)
    //       }
    //     )
    //   )
    //   .subscribe(
    //     positions => {
    //       if (positions) {
    //         this.positions = positions
    //         this.loading = false
    //       }
    //     },
    //     error => {
    //       MaterialService.toast(error)
    //     }
    //   )
  }

  positionDel(id: string) {
    const decision = window.confirm('Ви точно хочете видалити позицію?')

    if (decision) {
      this.positionsService.remove(id)
        .subscribe(
          (res) => {
            window.alert(res.message)
          },
          error1 => window.alert(error1.error.message),
          async () => {
            this.positions = await this.positionsService.fetchAll().toPromise()
          }
        )
    }
  }
}
