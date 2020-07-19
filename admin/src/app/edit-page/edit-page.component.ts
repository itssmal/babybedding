import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EditService} from "../shared/services/edit.service";
import {MainData} from "../shared/interfaces";
import {FormControl, FormGroup} from "@angular/forms";
import {MaterialService} from "../shared/services/material.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef
  @ViewChild('inputL') inputLRef: ElementRef
  @ViewChild('inputR') inputRRef: ElementRef

  form: FormGroup
  image: File
  imageL: File
  imageR: File
  mainData: MainData
  maindatas: MainData[]
  imagePreview: any
  imagePreviewL: any
  imagePreviewR: any

  constructor(private route: ActivatedRoute,
              private editService: EditService,
              private router: Router) {

  }

  ngOnInit() {

    this.form = new FormGroup({
      textLeft: new FormControl(),
      textRight: new FormControl()
    })

    this.editService.get()
      .subscribe(
        mainData => {
          if(mainData) {
            this.maindatas = mainData
            this.mainData = mainData[0]
            this.form.patchValue({
              textLeft: mainData[0].textLeft,
              textRight: mainData[0].textRight
            })
            this.imagePreview = mainData[0].mainImageSrc
            this.imagePreviewL = mainData[0].leftImageSrc
            this.imagePreviewR = mainData[0].rightImageSrc
            MaterialService.updateTextInputs()
          }
        },
        error => {
         console.log(error)
        }
      )

  }

  onSubmit() {
    this.form.disable()
    this.editService.update(this.mainData._id, this.form.value.textLeft, this.form.value.textRight, this.image, this.imageL, this.imageR )
    // this.editService.update(this.mainData._id, this.form.value.textLeft, this.form.value.textRight, this.image, this.imageL, this.imageR)
      .subscribe(
        mainData => {
          this.mainData = mainData
          window.alert('Зміни збережені')
          this.form.enable()
        }, error => {
            console.log(error)
             this.form.enable()
        },
          () => {
            this.router.navigate(['/edit'])
          }
      )
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

  onLeftImgUpload(event: any) {
    const fileL = event.target.files[0]
    this.imageL = fileL

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreviewL = reader.result
    }
    reader.readAsDataURL(fileL)
  }
  onRightImgUpload(event: any) {
    const fileR = event.target.files[0]
    this.imageR = fileR

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreviewR = reader.result
    }
    reader.readAsDataURL(fileR)
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }
}
