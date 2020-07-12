import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MaterialService} from "../shared/services/material.service";
import {CategoriesService} from "../shared/services/categories.service";
import {Category} from "../shared/interfaces";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  canDelete = false
  canEdit = false

  @ViewChild('floatingBtn') floatingRef: ElementRef

  categories$: Observable<Category[]>

  constructor(private categoriesService: CategoriesService,
              private router: Router) {
  }

  ngOnInit() {
   this.categories$ = this.categoriesService.fetch()
  }

  categoryDel(id: string) {
    const decision = window.confirm('Ви дійсно хочете видалити категорію?')

    if (decision) {
      this.categoriesService.remove(id)
        .subscribe(
          (res) => {
            window.alert(res.message)
          },
          error1 => window.alert(error1.error.message),
          () => {
             this.router.navigate(['/admin-categories'])
             this.categories$ = this.categoriesService.fetch()
            }
        )
    } else {
      this.router.navigate(['/admin-categories'])
    }
  }
}
