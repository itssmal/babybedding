import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import { AdminMainComponent } from './admin-main/admin-main.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminNavComponent } from './shared/layouts/admin-nav/admin-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PositionsPageComponent } from './positions-page/positions-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { CatPositionsComponent } from './categories-page/categories-form/cat-positions/cat-positions.component';
import { PositionsFormComponent } from './positions-page/positions-form/positions-form.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { EditPageComponent } from './edit-page/edit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AdminMainComponent,
    OrdersPageComponent,
    AdminNavComponent,
    PositionsPageComponent,
    CategoriesPageComponent,
    LoaderComponent,
    CategoriesFormComponent,
    CatPositionsComponent,
    PositionsFormComponent,
    FilterPipe,
    EditPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
