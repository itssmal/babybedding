import {Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {ActivatedRoute, Router, RouterEvent} from "@angular/router";

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit{

  @ViewChild('rla') activeLink: any


  links = [
    {url: '/admin-categories', name: 'Категорії'},
    {url: '/admin-positions', name: 'Позиції'},
    {url: '/admin-orders', name: 'Замовлення'},
    {url: '/edit', name: 'Редагувати'}
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {

  }

}
