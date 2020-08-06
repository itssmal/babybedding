import { Component, OnInit } from '@angular/core';
import {MainData} from "../../../../../../admin/src/app/shared/interfaces";
import {Observable} from "rxjs";
import {Category} from "../../shared/interfaces";
import {MainInfoService} from "../../shared/services/main-info.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  mainData: MainData
  categories$: Observable<Category[]>
  categories: Category[] = []

  constructor(private mainInfoService: MainInfoService,
              private toastr: ToastrService) {
  }

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
  }

}
