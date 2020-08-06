import {Component, EventEmitter, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CartService} from "../shared/services/cart.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {OrderPosition, Position} from "../shared/interfaces";
import {OrderService} from "../shared/services/order.service";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

interface SelectItem {
  label: string,
  value: string
}

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {


  form: FormGroup
  positions: Position[] = []
  orderPositions: OrderPosition[] = []
  areas: SelectItem[]
  area: string
  city: string
  department: string
  cities: SelectItem[]
  departments: SelectItem[]
  sum = 0

  constructor(private modalService: NgbModal,
              private cartService: CartService,
              private orderService: OrderService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.positions = this.cartService.positions
    this.sum = this.cartService.sum
    this.getAreas()

    this.form = new FormGroup({
      fullname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      tel: new FormControl(null,[Validators.required, Validators.minLength(10)]),
      area: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      department: new FormControl(null, Validators.required),
      note: new FormControl(null)
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  public getAreas() {
    this.cartService.getAreas().subscribe(
      (response: any) => {
        this.areas = response.data.map(area => ({
          label: area.Description,
          value: area.Ref
        }))
        this.areas = this.areas.slice(1);
    }
    )
  }

  public getCities(ref: string) {
    for (let a = 0; a < this.areas.length; a++) {
      if (this.areas[a].value === this.form.value.area) {
        this.area = this.areas[a].label
      }
    }
    this.cartService.getCities(ref).subscribe(
      (response: any) => {
        const arr = response.data.map(city => ({
          label: city.Description,
          value: city.Ref
        }))
        this.cities = arr
      }
    )
  }

  public getDepartments(ref: string) {
    for (let a = 0; a < this.cities.length; a++) {
      if (this.cities[a].value === this.form.value.city) {
        this.city = this.cities[a].label
      }
    }
    this.cartService.getDepartments(ref).subscribe(
      (response: any) => {
        const arr = response.data.map(department => ({
          label: department.Description,
          value: department.Ref
        }));
        this.departments = arr
      }
    )
  }

  setDepName() {
    for (let a = 0; a < this.departments.length; a++) {
      if (this.departments[a].value === this.form.value.department) {
        this.department = this.departments[a].label
      }
    }
  }

  onSubmit() {

    for (let b = 0; b < this.positions.length; b++) {
      const orPos: OrderPosition = Object.assign({},{
        position: this.positions[b].name,
        positionId: this.positions[b]._id,
        cost: this.positions[b].cost,
        quantity: this.positions[b].quantity
      })
      this.orderPositions.push(orPos)
    }

    this.orderService.create(
      this.orderPositions,
      this.sum,
      this.form.value.fullname,
      this.form.value.tel,
      this.form.value.email,
      this.area,
      this.city,
      this.department
      )
      .subscribe(
        message => {
          this.toastr.success(`Очікуйте лист на електронній скриньці`,'Дякуємо!', {
            timeOut: 5000,
            toastClass: 'toast',
            titleClass: 'toast-header',
            messageClass: 'toast-body'
          });
          this.modalService.dismissAll()
        },
        error => {
          this.toastr.error(error.error.message,'Помилка!', {
            timeOut: 5000,
            toastClass: 'toast',
            titleClass: 'toast-header',
            messageClass: 'toast-body'
          });
        }
      )
  }

  onRemove(i: number) {
    this.cartService.remove(i)
    this.sum = this.cartService.sum
  }

  calcSum(index: number, quantity: number) {
    if (this.positions[index].quantity === 0) {
      this.positions.splice(index, 1)
      this.cartService.positions = this.positions
    } else {
      this.cartService.refreshCart(index, quantity)
      this.sum = this.cartService.sum
    }
  }


}
