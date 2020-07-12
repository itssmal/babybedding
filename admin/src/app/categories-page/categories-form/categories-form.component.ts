import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../shared/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {MaterialService} from "../../shared/services/material.service";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css'],
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef

  category: Category
  form: FormGroup
  image: File
  imagePreview: any
  newMode = true
  newCatName = ''

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private router: Router) {
  }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.newMode = false
              return this.categoriesService.getById(params['id'])
            }

            return of(null)
          }
        )
      )
      .subscribe(
        category => {
          if (category) {
            this.category = category
            this.form.patchValue({
              name: category.name
            })
            this.imagePreview = category.imageSrc
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        error => {
          MaterialService.toast(error)
        }
        )
  }


  onSubmit() {
    let obs$

    this.form.disable()

    if (this.newMode === true) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)
    }
   obs$.subscribe(
     category => {
       this.category = category
       MaterialService.toast('Зміни збережені')
       this.form.enable()
     },
     error => {
      MaterialService.toast(error.error.message)
       this.form.enable()
     },
     () => {
       this.router.navigate(['/admin-categories'])
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

  deleteCategory() {
    const decision = window.confirm('Ви дійсно хочете видалити цю категорію?')

    if (decision) {
      this.categoriesService.remove(this.category._id)
        .subscribe(
          res => MaterialService.toast(res.message),
          error1 => MaterialService.toast(error1.error.message),
          () => {
            this.router.navigate(['/admin-categories'])
          }
        )
    }
  }
}
