import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../shared/models/shoppingCart'
import { ShoppingCartService } from '../shared/services/shopping_cart.service'
import { User } from '../shared/models/user'
import { UsersService } from '../shared/services/users.service'
import { Router } from "@angular/router"
import { NotificationsService } from "angular2-notifications"

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
  filterOrders: string
  isDelivered: boolean

  constructor(private shoppingCartService: ShoppingCartService,
              private usersService: UsersService,
              private router: Router,
              private _service: NotificationsService) { }

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
    this.filterOrders = 'Pending'
  }

  showClient(clientId){
    this.usersService.findUserById(clientId).subscribe((data)=>this.client = data)
  }

  deliver(order){
    let cart = {ownerId: order.ownerId, products: order.products, totalPrice: order.totalPrice, dateOfOrder: order.dateOfOrder, dateOfDelivery: Date.now(), status: 'Delivered'}
    this.shoppingCartService.editShoppingCart(cart, order.$key)
    .subscribe(()=>this._service.success(
                            'Order was delivered',
                            'Continue editing the orders',
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                            }
                        ),
                        (err)=>console.log(err))

  }

  onChange(selected){
    this.filterOrders = selected
    if(this.filterOrders == 'Delivered'){
      this.isDelivered = true
    } else {
      this.isDelivered = false
    }
  }
}
