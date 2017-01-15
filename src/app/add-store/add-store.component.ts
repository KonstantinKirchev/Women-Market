import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { StoresService } from "../shared/services/stores.service";
import { Router } from "@angular/router";
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})

export class AddStoreComponent implements OnInit {

  form: FormGroup

  constructor(private fb:FormBuilder, public af: AngularFire, private router:Router, private storesService: StoresService) {
                this.form = this.fb.group({
                    name: ['', Validators.required],
                    picture: ['', Validators.required],
                    email: ['', Validators.required],
                    address: ['', Validators.required],
                    phone: ['', Validators.required],
                    description: ['', Validators.required],
                });
               }

  ngOnInit() {
  }

  isAllValExist() {
      const val = this.form.value;
      return val && val.name && val.picture && val.email && val.address && val.phone && val.description
  }

  add(){
    const val = this.form.value;

    let data = { name: val.name, picture: val.picture, email: val.email, 
                 address: val.address, phone: val.phone, description: val.description}

    this.storesService.addStore(JSON.stringify(data)).subscribe(()=>console.log('Store added.'));
    this.router.navigate(['/stores'])
  }

  cancel(){
    this.router.navigate(['/'])
  }

}
