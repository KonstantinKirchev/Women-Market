import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "../shared/services/shopping_cart.service";
import { NotificationsService } from "angular2-notifications"
import { Router } from "@angular/router"

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  productList: any
  baseproductList: any
  total: number = 0
  isEmpty: boolean = false

  constructor(private shoppingCartService: ShoppingCartService,
              private _service: NotificationsService,
              private router: Router ) { }

  ngOnInit() {
    this.productList = JSON.parse(localStorage.getItem('shopping-cart'))
    if(this.productList){
      for(let product of this.productList){
        this.total += product.price
      }
      if(this.total != 0){
        this.isEmpty = !this.isEmpty
      }
    }
  }

  decrease(i){
    if(this.productList[i].units > 0){
      this.productList[i].units -= 1
      this.productList[i].price -= this.productList[i].unitPrice
      this.total -= this.productList[i].unitPrice
      localStorage.setItem('shopping-cart', JSON.stringify(this.productList))
    }

    if(this.productList[i].units == 0){
      this._service.success(
                            'Successfully removed',
                            'Continue shopping',
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                            }
                        )
      this.productList.splice( i, 1 )
      localStorage.setItem('shopping-cart', JSON.stringify(this.productList))
    }

    if(this.productList.length == 0){
      this.isEmpty = false
    }
    
  }

  increase(i){
    //this.baseproductList = JSON.parse(localStorage.getItem('shopping-cart'))
    this.productList[i].units += 1
    this.productList[i].price += this.productList[i].unitPrice
    this.total += this.productList[i].unitPrice
    localStorage.setItem('shopping-cart', JSON.stringify(this.productList))
  }

  removeProduct(key){
    this.total -= this.productList[key].price
    this.productList.splice( key, 1 )
    localStorage.setItem('shopping-cart', JSON.stringify(this.productList))
    if(this.productList.length == 0){
      this.isEmpty = !this.isEmpty
    }
    this._service.success(
                            'Successfully removed',
                            'Continue shopping',
                            {
                                timeOut: 5000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                            }
                        )
  }

  order(){
    this.productList = JSON.parse(localStorage.getItem('shopping-cart'))
    let profile = JSON.parse(localStorage.getItem('profile'))
    if(!profile.address && !profile.phone){
      this.router.navigate(['/profile'])
      this._service.info(
                          'Please edit your profile.',
                          'We need your address and phone number.',
                          {
                              timeOut: 3000,
                              showProgressBar: true,
                              pauseOnHover: false,
                              clickToClose: true
                          }
                      )
    } else {
      let cart = {ownerId: profile.uid, products: localStorage.getItem('shopping-cart'), totalPrice: this.roundNumber(this.total, 2), dateOfOrder: Date.now(), dateOfDelivery: null, status: 'Pending'}
      this.shoppingCartService.createShoppingCart(cart)
      .subscribe(()=>this._service.success(
                            'Your order was received.',
                            'Thank you for shopping with us.',
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                            }
                        ))
      this.productList = null
      localStorage.setItem('shopping-cart', JSON.stringify([]))
      this.total = 0
      this.isEmpty = false
    }
  }

  roundNumber(num, scale) {
    var number = Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale);
    if(num - number > 0) {
      return (number + Math.floor(2 * Math.round((num - number) * Math.pow(10, (scale + 1))) / 10) / Math.pow(10, scale));
    } else {
      return number;
    }
  }

}
