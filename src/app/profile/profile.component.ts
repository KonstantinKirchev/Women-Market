import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "../shared/services/shopping_cart.service";
import { ShoppingCart } from "../shared/models/shoppingCart";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any
  isEditable: boolean
  carts: ShoppingCart[] = []
  isVisible: boolean
  productList: any

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'))
    if(!this.profile.name){
      let name = this.profile.email.substring(0, this.profile.email.lastIndexOf("@"))
      this.profile.displayName = name
    }
    this.isEditable = false
    this.isVisible = false
  }

  editProfile(){
    this.isEditable = true
  }

  myOrders(){
    this.isVisible = true
    this.shoppingCartService.findAllShoppingCarts()
    .subscribe((scarts)=>{
      this.carts = []
      for(let scart of scarts){
        if(scart.ownerId == this.profile.uid){
          this.carts.push(scart)
        }
      }
    })
  }

  close(){
    this.isVisible = false
  }

  cartProducts(products:any, lgModal:any){
    this.productList = JSON.parse(products)
    lgModal.show() 
  }
}
