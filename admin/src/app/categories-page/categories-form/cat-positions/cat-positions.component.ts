import {Component, Input, OnInit} from '@angular/core';
import {PositionsService} from "../../../shared/services/position.service";
import {Position} from "../../../shared/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cat-positions',
  templateUrl: './cat-positions.component.html',
  styleUrls: ['./cat-positions.component.css']
})
export class CatPositionsComponent implements OnInit {

  @Input('categoryId') categoryId: string

  loading = false
  canDelete = false;
  positions: Position[] =[]
  onAdd = true

  constructor(private positionsService: PositionsService,
              private router: Router) {
  }

  ngOnInit() {
    this.loading = true
    this.positionsService.fetch(this.categoryId)
      .subscribe(positions => {
        this.positions = positions
        this.loading = false
      })
  }

  positionDel (id: string) {
   const decision = window.confirm('Ви дійсно хочете видалити позицію?')

    if (decision) {
      this.positionsService.remove(id)
        .subscribe(
          res => window.alert(res.message),
          error1 => window.alert(error1.error.message),
          () => {
            this.router.navigate([`/admin-categories/${this.categoryId}`])
          }
        )
    }
  }
}
