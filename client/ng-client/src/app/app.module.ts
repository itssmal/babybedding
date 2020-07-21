import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './shared/layout/main/main.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { PositionsPageComponent } from './positions-page/positions-page.component';
import { PositionViewPageComponent } from './positions-page/position-view-page/position-view-page.component';
import {AppRoutingModule} from "./app-routing.module";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularTiltModule} from "angular-tilt";
import { AboutUsComponent } from './main-page/about-us/about-us.component';
import { DeliveryComponent } from './main-page/delivery/delivery.component';
import { ContactsComponent } from './main-page/contacts/contacts.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MainPageComponent,
    CategoriesPageComponent,
    CartPageComponent,
    PositionsPageComponent,
    PositionViewPageComponent,
    AboutUsComponent,
    DeliveryComponent,
    ContactsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    BrowserAnimationsModule,
    AngularTiltModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
