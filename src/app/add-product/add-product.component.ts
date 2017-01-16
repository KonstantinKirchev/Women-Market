import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ProductsService } from "../shared/services/products.service";
import { StoresService } from "../shared/services/stores.service";
import { Router } from "@angular/router";
import { AngularFire } from 'angularfire2';

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
              private productsService: ProductsService, private storesService: StoresService) {
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

    let data = { name: val.name, picture: val.picture, price: val.price, 
                 quantity: val.quantity, description: val.description, category: val.category, store: val.store}

    this.productsService.addProduct(JSON.stringify(data)).subscribe(()=>console.log('Product added.'));
    this.router.navigate(['/products/all'])
  }

  cancel(){
    this.router.navigate(['/'])
  }

}
