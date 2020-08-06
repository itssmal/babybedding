import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MainData} from "../../../../../admin/src/app/shared/interfaces";
import {MainInfoService} from "../shared/services/main-info.service";
import {CategoriesService} from "../shared/services/categories.service";
import {Observable} from "rxjs";
import {Category} from "../shared/interfaces";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit {

  mainData: MainData
  categories$: Observable<Category[]>
  categories: Category[] = []

  constructor(private mainInfoService: MainInfoService,
              private categoriesService: CategoriesService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.mainInfoService.get()
      .subscribe(
        mainData => {
          this.mainData = mainData[0]
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

    this.categories$ = this.categoriesService.get()

  }

  goToPos(id: string, name: string) {
    this.router.navigate([`/positions/`, id], {state: {catName: name}})
    history.pushState({catName: name}, '', `/positions/${id}`)
  }
}
