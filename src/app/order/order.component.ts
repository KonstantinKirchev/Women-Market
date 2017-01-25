import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../shared/models/shoppingCart'
import { ShoppingCartService } from '../shared/services/shopping_cart.service'
import { User } from '../shared/models/user'
import { UsersService } from '../shared/services/users.service'
import { Router } from "@angular/router"

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: ShoppingCart[]
  isEmpty: boolean
  client: User
  clientId: string

  constructor(private shoppingCartService: ShoppingCartService,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.shoppingCartService.findAllShoppingCarts()
    .subscribe((data)=>{
      this.orders = data
      if(this.orders.length > 0){
        this.isEmpty = false
      } else {
        this.isEmpty = true
      }
    })
  }

  showClient(clientId){
    this.usersService.findUserById(clientId).subscribe((data)=>this.client = data)
  }
}
