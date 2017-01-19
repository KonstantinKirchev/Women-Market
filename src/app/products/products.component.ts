import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../shared/services/products.service";
import { ShoppingCartService } from "../shared/services/shopping_cart.service";
import { Product } from "../shared/models/product";
import { NotificationsService } from "angular2-notifications"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  cart: Product[]
  products: any  
  
  constructor(private productsService: ProductsService, 
              private shoppingCartService: ShoppingCartService,
              private _service: NotificationsService) { }

  ngOnInit() {
    this.productsService.findAllProducts().subscribe((res)=> this.products = res)
    this.cart = JSON.parse(localStorage.getItem('shopping-cart'))
    console.log(this.cart)
  }

  addToCart(product){

    if(this.cart.indexOf(product) === -1){
      console.log(this.cart)
      product['unitPrice'] = product.price
      this.cart.push(product)
      this._service.success(
                            'The product was added',
                            'Continue shopping',
                            {
                                timeOut: 5000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                            }
                        )
    }
    else{
      //product.quantity += 1
      this._service.error(
                            'This product was already added',
                            'Continue shopping',
                            {
                                timeOut: 5000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                            }
                        )
    }
    localStorage.setItem('shopping-cart', JSON.stringify(this.cart))
  }
}
