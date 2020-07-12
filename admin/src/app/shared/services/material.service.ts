import {ElementRef} from "@angular/core";

declare var M

export class MaterialService {


  static initializeFloatingButton (ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement,{
      toolbarEnabled: true
    })
  }
  static updateTextInputs () {
    M.updateTextFields()
  }

  static toast(message: string) {
    M.toast({html: message, classes: 'red rounded'})
  }

}
