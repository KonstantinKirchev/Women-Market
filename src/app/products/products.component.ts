import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../shared/services/products.service";
import { ShoppingCartService } from "../shared/services/shopping_cart.service";
import { Product } from "../shared/models/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  cart: any = []
  products: any
  
  constructor(private productsService: ProductsService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.productsService.findAllProducts().subscribe((res)=> this.products = res)
  }

  addToCart(product){

    if(this.cart.indexOf(product) === -1){
      product['unitPrice'] = product.price
      this.cart.push(product)
      //console.log(product.price)
      //this.cart['unitPrice'] = product.price
    }
    // else{
    //   product.quantity += 1
    // }
    localStorage.setItem('shopping-cart', JSON.stringify(this.cart))
    console.log(this.cart)

    // if(localStorage.getItem('shopping-cart') == null){
    //   //this.cart = []
    //   this.cart.push(product)
    //   localStorage.setItem('shopping-cart', JSON.stringify(this.cart))
    // } else {
    //   this.cart = JSON.parse(localStorage.getItem('shopping-cart'))
    //   if(this.cart.indexOf(product) === -1){
    //     this.cart.push(product)
    //   } else {
    //     product.quantity += 1
    //   }
    //   localStorage.setItem('shopping-cart', JSON.stringify(this.cart))
    // }
    
    // else{
    //   product.quantity += 1
    // }


    //let profile = JSON.parse(localStorage.getItem('profile')) 
    //let data = {name: product.name, quantity: product.quantity, price: product.price}

    //if(localStorage.getItem('shopping-cart') == null){
      
      //this.cart.push(data)
      //this.shoppingCartService.createShoppingCart(this.data).subscribe(()=>console.log("Shopping cart created"))
      //localStorage.setItem('shopping-cart', JSON.stringify(this.cart))
       
      // this.shoppingCartService.findShoppingCart(profile.uid)
      // .subscribe((data) => {
      //   this.cart = data
      //   if(this.cart == undefined){
      //     let data = { ownerId: profile.uid, products: [], totalPrice: 0, dateOfOrder: Date.now, isComplete: false }
      //     this.shoppingCartService.createShoppingCart(data).subscribe((res)=>console.log(res))
      //   }
      //   if(!this.cart.isComplete){
      //     localStorage.setItem('shopping-cart', JSON.stringify(this.cart))
      //   }
      // })

     
    //} else {
      // this.cart = JSON.parse(localStorage.getItem('shopping-cart'))
      // if(this.cart.indexOf(product) === -1){
      //   this.cart.push(data)
      // } 
      // else {
      //   this.cart.quantity += 1
      // }
      //this.cart.products.push(product)
      //if(this.cart)
      //console.log(product)
      //console.log(this.cart)

      //this.cart = JSON.parse(localStorage.getItem('shopping-cart'))
      
    //}
    
 
    

    // else{
    //   product.quantity += 1
    // }
    //localStorage.setItem('live-cart', JSON.stringify(this.cart))
    //this.cart = JSON.parse(localStorage.getItem('shopping-cart'))
    // if(this.cart.indexOf(product) === -1){
    //   this.cart.push(product)
    // }
    //console.log(this.cart)
  }
}
