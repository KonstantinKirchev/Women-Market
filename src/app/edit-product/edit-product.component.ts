import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from "@angular/router"
import { Product } from '../shared/models/product'
import { ProductsService } from "../shared/services/products.service";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { StoresService } from "../shared/services/stores.service";
import { NotificationsService } from "angular2-notifications"

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId: string
  product: Product
  form: FormGroup

  constructor(private activatedRoute: ActivatedRoute, 
              private router: Router,
              private productsService: ProductsService,
              private fb:FormBuilder,
              private storesService: StoresService,
              private _service: NotificationsService) {
    
  }

  ngOnInit() {
    // this.productId = this.activatedRoute.snapshot.queryParams['products/edit'];
    // console.log('product', this.productId)
    
    this.activatedRoute.params.subscribe(params => {
            this.productId = params['id'];
            console.log(this.productId)
            this.productsService.findProductById(this.productId)
            .subscribe(item => {
              this.product = item
              console.log(this.product)
              this.form = this.fb.group({
                    name: [this.product.name, Validators.required],
                    picture: [this.product.picture, Validators.required],
                    price: [this.product.price, Validators.required],
                    quantity: [this.product.quantity, Validators.required],
                    description: [this.product.description, Validators.required]
                });
            })
    })
  }

  isAllValExist() {
      const val = this.form.value;
      return val && val.name && val.picture && val.price && val.quantity && val.description
  }

  edit(){
    const val = this.form.value;
    let units = 1
    let store = this.product.store
    let category = this.product.category

    let data = { name: val.name, picture: val.picture, price: val.price, 
                 quantity: val.quantity, units: units, description: val.description, category: category, store: store}

    this.productsService.editProduct(JSON.stringify(data), this.product.$key)
    .subscribe(()=> this._service.success(
                          'Edit successfully',
                          'Continue editing/deleting',
                          {
                              timeOut: 3000,
                              showProgressBar: true,
                              pauseOnHover: false,
                              clickToClose: true
                          }
                      ));
    this.router.navigate(['/products/all'])
  }

  cancel(){
    this.router.navigate(['/products/all'])
    this._service.info(
                          'Edit was canceled',
                          'Continue editing/deleting',
                          {
                              timeOut: 3000,
                              showProgressBar: true,
                              pauseOnHover: false,
                              clickToClose: true
                          }
                      )
  }

}
