import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ProductsService } from "../shared/services/products.service";
import { StoresService } from "../shared/services/stores.service";
import { Router } from "@angular/router";
import { AngularFire } from 'angularfire2';
import { NotificationsService } from "angular2-notifications"

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  form: FormGroup
  stores: any
  categories: string[] = ['fruits', 'vegetables', 'dairy', 'meats']

  constructor(private fb:FormBuilder, public af: AngularFire, private router:Router,
              private productsService: ProductsService, private storesService: StoresService,
              private _service: NotificationsService) {
                this.form = this.fb.group({
                    name: ['', Validators.required],
                    picture: ['', Validators.required],
                    price: ['', Validators.required],
                    quantity: ['', Validators.required],
                    description: ['', Validators.required],
                    category: ['', Validators.required],
                    store: ['', Validators.required]
                });
               }

  ngOnInit() {
    this.storesService.findAllStores().subscribe((stores) => this.stores = stores)
  }

  isAllValExist() {
      const val = this.form.value;
      return val && val.name && val.picture && val.price && val.quantity && val.description && val.category && val.store
  }

  add(){
    const val = this.form.value;
    let units = 1

    let data = { name: val.name, picture: val.picture, price: val.price, 
                 quantity: val.quantity, units: units, description: val.description, category: val.category, store: val.store}

    this.productsService.addProduct(JSON.stringify(data))
                        .subscribe(()=>this._service.success(
                          'Product added successfully',
                          'Continue adding',
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
    this.router.navigate(['/'])
    this._service.info(
                          'Added product was canceled',
                          'Continue adding',
                          {
                              timeOut: 3000,
                              showProgressBar: true,
                              pauseOnHover: false,
                              clickToClose: true
                          }
                      )
  }

}
