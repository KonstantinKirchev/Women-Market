import { Component, OnInit } from '@angular/core'
import { StoresService } from "../shared/services/stores.service"
import { ProductsService } from "../shared/services/products.service"
import { AuthService } from '../shared/security/auth.service'
import { Router } from "@angular/router"
import { NotificationsService } from "angular2-notifications"

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  stores: any
  products: any

  constructor(private storesService: StoresService, 
              private productsService: ProductsService,
              private auth: AuthService,
              private router: Router,
              private _service: NotificationsService) { }

  ngOnInit() {
    this.storesService.findAllStores().subscribe((res)=> this.stores = res)
  }

  editStore(store){
    this.router.navigate(['/stores/edit/' + store.$key])
  }

  deleteStore(store){
    this.productsService.findAllProducts()
    .subscribe((res)=>{
      this.products = res
      for(let product of this.products){
        if(store.name == product.store){
          this.productsService.deleteProduct(product.$key)
              .subscribe(()=>{
                this._service.success(
                            'The product was deleted successfully',
                            'Continue editing/deleting',
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                })
              })
        } 
      }
    })
    
    this.storesService.deleteStore(store.$key)
    .subscribe(
      ()=>
      {
        this._service.success(
                            'The store was deleted successfully',
                            'Continue editing/deleting',
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                            }
      )
    },
        err => this._service.error(
                            'This store cannot be deleted',
                             err,
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                            }
                        ));
   }

}
