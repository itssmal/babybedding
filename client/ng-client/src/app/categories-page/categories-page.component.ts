import {Component, EventEmitter, OnInit} from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import {Observable} from "rxjs";
import {Category} from "../shared/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  categories$: Observable<Category[]>
  categories: Category[] = []

  constructor(private categoriesService: CategoriesService,
              private router: Router) { }

  ngOnInit() {
    this.categories$ = this.categoriesService.get()
  }


  goToPos(id: string, name: string) {
    this.router.navigate([`/positions/`, id], {state: {catName: name}})
    history.pushState({catName: name}, '', `/positions/${id}`)
  }
}
