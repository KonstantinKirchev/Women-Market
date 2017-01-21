import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { ProductsService } from "../shared/services/products.service"
import { StoresService } from "../shared/services/stores.service"
import { NotificationsService } from "angular2-notifications"
import { Store } from '../shared/models/store'

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css']
})
export class EditStoreComponent implements OnInit {

  store: Store
  storeId: string
  form: FormGroup

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productsService: ProductsService,
              private fb:FormBuilder,
              private storesService: StoresService,
              private _service: NotificationsService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
            this.storeId = params['id'];
            this.storesService.findStoreById(this.storeId)
            .subscribe(item => {
              this.store = item
              this.form = this.fb.group({
                    name: [this.store.name, Validators.required],
                    picture: [this.store.picture, Validators.required],
                    email: [this.store.email, Validators.required],
                    address: [this.store.address, Validators.required],
                    phone: [this.store.phone, Validators.required],
                    description: [this.store.description, Validators.required]
                });
            })
    })
  }

  isAllValExist() {
      const val = this.form.value;
      return val && val.name && val.picture && val.email && val.address && val.phone && val.description
  }

  edit(){
    const val = this.form.value;

    let data = { name: val.name, picture: val.picture, email: val.email, 
                 address: val.address, phone: val.phone, description: val.description }

    this.storesService.editStore(JSON.stringify(data), this.store.$key)
    .subscribe(()=> this._service.success(
                          'Store was successfully edited',
                          'Continue editing/deleting',
                          {
                              timeOut: 3000,
                              showProgressBar: true,
                              pauseOnHover: false,
                              clickToClose: true
                          }
                      ));
    this.router.navigate(['/stores'])
  }

  cancel(){
    this.router.navigate(['/stores'])
    this._service.info(
                          'Edit store was canceled',
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
