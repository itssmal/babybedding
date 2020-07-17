import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./shared/layout/main/main.component";
import {NgModule} from "@angular/core";
import {CartPageComponent} from "./cart-page/cart-page.component";
import {CategoriesPageComponent} from "./categories-page/categories-page.component";
import {PositionsPageComponent} from "./positions-page/positions-page.component";
import {PositionViewPageComponent} from "./positions-page/position-view-page/position-view-page.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {AboutUsComponent} from "./main-page/about-us/about-us.component";
import {DeliveryComponent} from "./main-page/delivery/delivery.component";
import {ContactsComponent} from "./main-page/contacts/contacts.component";

const routes: Routes = [
  {path: '', component: MainComponent, children: [
      {path: 'cart', component: CartPageComponent},
      {path: 'main', component: MainPageComponent, children: [
          {path: 'about-us', component: AboutUsComponent},
          {path: 'delivery', component: DeliveryComponent},
          {path: 'contacts', component: ContactsComponent},
        ]},
      {path: 'positions/:id', component: PositionsPageComponent},
      {path: 'categories', component: CategoriesPageComponent},
      {path: 'position/:id', component: PositionViewPageComponent},
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
