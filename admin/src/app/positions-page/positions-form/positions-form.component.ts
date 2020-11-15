import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PositionsService} from "../../shared/services/position.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {Category, Position} from "../../shared/interfaces";
import {MaterialService} from "../../shared/services/material.service";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit {

  @Input('categoryId') catId: string
  @ViewChild('input') inputRef: ElementRef

  position: Position
  image: File
  images: File[]
  fetchedImages = []
  imagePreview: any
  imagesPreview = []
  form: FormGroup
  categories: Category[]
  newMode = true
  newPosName = ''
  error: string
  res: string
  actCat: string
  mainImageId = 0
  saleMode: boolean

  constructor(private positionsService: PositionsService,
              private categoriesService: CategoriesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(){

    this.getCategories()

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      cost: new FormControl(null, Validators.required),
      saleCost: new FormControl(null),
      categoryId: new FormControl(null, Validators.required)
     })

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.actCat = params['id']
              this.newMode = false
              return this.positionsService.fetchOne(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        position => {
          if (position) {
            this.position = position
            this.form.patchValue({
              name: position.name,
              description: position.description,
              cost: position.cost,
              saleCost: position.saleCost,
              categoryId: position.category
            })
            console.log(this.form.get('categoryId').value)
            console.log(position.category)
            this.mainImageId = position.mainImageId
            this.imagesPreview = position.images
            this.images = position.images
            position.saleCost ? this.saleMode = true : this.saleMode = false
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        error => {
          this.error = error
        }
      )
  }

  async getCategories() {
    this.categories = await this.categoriesService.fetch().toPromise()
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    this.imagesPreview = []
    this.images = []

    for (let i = 0; i< event.target.files.length; i++) {

      const file = event.target.files[i]
      this.images.push(file)

      const reader = new FileReader()

      reader.onload = () => {
        this.imagesPreview.push({imageSrc: reader.result})
        console.log(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  onSubmit() {
    let obs$

    this.form.disable()

    if (this.newMode) {
      obs$ = this.positionsService.create(
        this.form.value.name,
        this.form.value.description,
        this.form.value.cost,
        this.form.value.categoryId,
        this.images,
        this.mainImageId,
        this.form.value.saleCost,
      )
    } else {
      obs$ = this.positionsService.update(
        this.position._id,
        this.form.value.name,
        this.form.value.description,
        this.form.value.cost,
        this.form.value.categoryId,
        this.images,
        this.mainImageId,
        this.form.value.saleCost,
      )
    }
    obs$.subscribe(
      position => {
        this.position = position
        window.alert('Зміни збережені')
        this.form.enable()
      },
      error => {
        window.alert(error.error.message)
        this.form.enable()
      },
      () => {
        this.mainImageId = 0
        if (this.position.categoryId) {
          this.router.navigate([`/admin-categories/${this.position.categoryId}`])
        }
        this.router.navigate([`/admin-positions`])
      }
    )
  }

  deletePosition() {
    const decision = window.confirm('Ви дійсно хочете видалити позицію?')

    if (decision) {
      this.positionsService.remove(this.position._id)
        .subscribe(
          res => window.alert(res.message),
          error1 => window.alert(error1),
          () => {
            this.router.navigate(['/admin-positions'])
          }
        )
    }
  }

  toggleMain(i: number) {

    console.log(i)
    this.mainImageId = i
    //
    // for (let a = 0; a < this.imagesPreview.length; a++) {
    //   this.imagesPreview[a].main = false
    // }
    // this.imagesPreview[i].main = true
    // console.log(this.imagesPreview)
  }


  toggleSaleMode() {
    this.saleMode = !this.saleMode
    if (!this.saleMode) {
      this.form.get('saleCost').setValue(null)
    }
  }
}
