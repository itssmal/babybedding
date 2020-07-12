import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PositionsService} from "../../shared/services/position.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {MaterialService} from "../../shared/services/material.service";
import {Category, Position} from "../../shared/interfaces";

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
  imagePreview: any
  form: FormGroup
  categories$: Observable<Category[]>
  newMode = true
  newPosName = ''
  error: string
  res: string
  actCat: string

  constructor(private positionsService: PositionsService,
              private categoriesService: CategoriesService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(){

    this.categories$ = this.categoriesService.fetch()

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      cost: new FormControl(null, Validators.required),
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
              categoryId: position.categoryId
            })
            this.imagePreview = position.imageSrc
          }
          this.form.enable()
        },
        error => {
          this.error = error
        }
      )

  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
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
        this.image
      )
    } else {
      obs$ = this.positionsService.update(
        this.position._id,
        this.form.value.name,
        this.form.value.description,
        this.form.value.cost,
        this.form.value.categoryId,
        this.image
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
}
