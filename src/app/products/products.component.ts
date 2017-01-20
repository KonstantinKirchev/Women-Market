import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../shared/services/products.service";
import { ShoppingCartService } from "../shared/services/shopping_cart.service";
import { Product } from "../shared/models/product";
import { NotificationsService } from "angular2-notifications"
import { AuthService } from '../shared/security/auth.service'
import { Router } from "@angular/router"

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
              private _service: NotificationsService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.productsService.findAllProducts().subscribe((res)=> this.products = res)
    this.cart = JSON.parse(localStorage.getItem('shopping-cart'))
  }

  addToCart(product){

    if(this.cart.indexOf(product) === -1){
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

  editProduct(product){
    console.log(product.$key)
    this.router.navigate(['/products/edit/' + product.$key])
  }

  deleteProduct(key){
    this.productsService.deleteProduct(key)
    .subscribe(
      ()=>this._service.success(
                            'The product was deleted successfully',
                            'Continue editing/deleting',
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                            }
                        ),
        err => this._service.error(
                            'This product cannot be deleted',
                             err,
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                            }
                        ),
          () => console.log('Finished'));
  }
}
