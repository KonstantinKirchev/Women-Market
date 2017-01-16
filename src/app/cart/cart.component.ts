import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productList: any
  baseproductList: any
  total: number = 0

  constructor() { }

  ngOnInit() {
    this.productList = JSON.parse(localStorage.getItem('live-cart'))
    for(let product of this.productList){
      //let price = product.price as number
      //console.log(typeof(product.price))
      //console.log((product.price))
      this.total = this.total + product.price
    }
    console.log(this.total)
  }

  decrease(i){
    if(this.productList[i].quantity !== 1){
      this.productList[i].quantity -= 1
    }
    this.baseproductList = JSON.parse(localStorage.getItem('live-cart'))
    this.productList[i].price -= this.baseproductList[i].price
  }

  increase(i){
    this.baseproductList = JSON.parse(localStorage.getItem('live-cart'))
    this.productList[i].quantity += 1
    this.productList[i].price += this.baseproductList[i].price
  }

}
