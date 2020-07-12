import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {OrdersPageComponent} from "./orders-page/orders-page.component";
import {AdminNavComponent} from "./shared/layouts/admin-nav/admin-nav.component";
import {PositionsPageComponent} from "./positions-page/positions-page.component";
import {CategoriesPageComponent} from "./categories-page/categories-page.component";
import {CategoriesFormComponent} from "./categories-page/categories-form/categories-form.component";
import {PositionsFormComponent} from "./positions-page/positions-form/positions-form.component";
import {EditPageComponent} from "./edit-page/edit-page.component";

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  // {path: 'register', component: LoginPageComponent},
  {path: '', component: AdminNavComponent, canActivate: [AuthGuard],  children: [
      {path: 'admin-categories', component: CategoriesPageComponent},
      {path: 'admin-positions', component: PositionsPageComponent},
      {path: 'admin-orders', component: OrdersPageComponent},
      {path: 'edit', component: EditPageComponent},
      {path: 'admin-categories/new', component: CategoriesFormComponent},
      {path: 'admin-categories/:id', component: CategoriesFormComponent},
      {path: 'admin-positions/new', component: PositionsFormComponent},
      {path: 'admin-positions/edit/:id', component: PositionsFormComponent},
      {path: 'admin-positions/cat/:id', component: PositionsPageComponent},
      {path: 'admin-positions/:id', component: PositionsPageComponent}
    ],
    runGuardsAndResolvers: "always"
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]

})

export class AppRoutingModule {

}
