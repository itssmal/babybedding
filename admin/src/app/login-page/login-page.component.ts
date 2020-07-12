import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth-service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../shared/services/material.service";
import {error} from "selenium-webdriver";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit, OnDestroy  {

  form: FormGroup
  aSub: Subscription
  error: string

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['accessDenied']) {
        this.error = 'Авторизуйтесь в системі!'
      }
      else if (params['sessionFailed']) {
        this.error = 'Авторизуйтесь в системі!'
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit(){
    this.form.disable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/admin-orders']),
      error1 => {
        this.error = error1.error.message
        this.form.enable()
      }
    )
  }



}
