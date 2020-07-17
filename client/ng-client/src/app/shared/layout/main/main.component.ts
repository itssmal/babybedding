import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isMenuCollapsed = true

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

}
