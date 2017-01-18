import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "../shared/services/shopping_cart.service";

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

  constructor(private shoppingCartService: ShoppingCartService ) { }

  ngOnInit() {
    this.productList = JSON.parse(localStorage.getItem('shopping-cart'))
    for(let product of this.productList){
      this.total = this.total + product.price
      if(this.total != 0){
        this.isEmpty = !this.isEmpty
      }
    }
  }

  decrease(i){
    if(this.productList[i].quantity > 0){
      //this.baseproductList = JSON.parse(localStorage.getItem('shopping-cart'))
      this.productList[i].quantity -= 1
      this.productList[i].price -= this.productList[i].unitPrice
      this.total -= this.productList[i].unitPrice
      localStorage.setItem('shopping-cart', JSON.stringify(this.productList))
    }

    if(this.productList[i].quantity == 0){
      //this.baseproductList = JSON.parse(localStorage.getItem('shopping-cart'))
      //this.productList[i].price -= this.baseproductList[i].price
      //this.total -= this.productList[i].unitPrice
      this.productList.splice( i, 1 )
      localStorage.setItem('shopping-cart', JSON.stringify(this.productList))
    }

    if(this.total == 0){
      this.isEmpty = !this.isEmpty
    }
    
  }

  increase(i){
    //this.baseproductList = JSON.parse(localStorage.getItem('shopping-cart'))
    this.productList[i].quantity += 1
    this.productList[i].price += this.productList[i].unitPrice
    this.total += this.productList[i].unitPrice
    localStorage.setItem('shopping-cart', JSON.stringify(this.productList))
  }

  removeProduct(key){
    this.total -= this.productList[key].price
    this.productList.splice( key, 1 )
    localStorage.setItem('shopping-cart', JSON.stringify(this.productList))
    if(this.total == 0){
      this.isEmpty = !this.isEmpty
    }
  }

  order(){
    this.productList = JSON.parse(localStorage.getItem('shopping-cart'))
    let profile = JSON.parse(localStorage.getItem('profile'))
    let cart = {ownerId: profile.uid, products: localStorage.getItem('shopping-cart'), totalPrice: this.total, dateOfOrder: Date.now()}
    this.shoppingCartService.createShoppingCart(cart).subscribe((res)=>console.log(res))
    localStorage.removeItem('shopping-cart')
    this.productList = null
    this.total = 0
    this.isEmpty = false
  }

}
