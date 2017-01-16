import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../shared/services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  cart: any = []

  products: any
  
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.findAllProducts().subscribe((res)=> this.products = res)
  }

  addToCart(product){
    if(this.cart.indexOf(product) === -1){
      this.cart.push(product)
    }
    // else{
    //   product.quantity += 1
    // }
    localStorage.setItem('live-cart', JSON.stringify(this.cart))
    console.log(this.cart)
  }
}
