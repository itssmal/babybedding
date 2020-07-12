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

  form: FormGroup
  image: File
  mainData: MainData
  maindatas: MainData[]
  imagePreview: any

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
            MaterialService.updateTextInputs()
          }
        },
        error => {
          window.alert(error.error.message)
        }
      )

  }

  onSubmit() {
    this.form.disable()
    this.editService.update(this.mainData._id, this.form.value.textLeft, this.form.value.textRight, this.image)
      .subscribe(
        mainData => {
          this.mainData = mainData
          window.alert('Зміни збережені')
          this.form.enable()
        }, error => {
            window.alert(error.error.message)
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

  triggerClick() {
    this.inputRef.nativeElement.click()
  }
}
