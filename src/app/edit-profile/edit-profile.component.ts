import { Component, OnInit, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "../shared/security/auth.service";
import { UsersService } from "../shared/services/users.service";
import { Router } from "@angular/router";
import { AngularFire } from 'angularfire2';
import { NotificationsService } from "angular2-notifications"

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  inputs: ['isEditable'],
  outputs: ['onCancel']
})
export class EditProfileComponent implements OnInit {

  form: FormGroup
  isEditable: boolean
  onCancel = new EventEmitter<boolean>()
  profile: any
  uid: string
  userKey: any

  constructor(private fb:FormBuilder, private authService: AuthService, public af: AngularFire, 
              private router:Router, private usersService: UsersService, private _service: NotificationsService) {
  }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'))
    this.uid = this.profile.uid
    this.usersService.findUserById(this.uid)
                      .subscribe((result)=>{
                        this.userKey = result.$key
                      })
    this.form = this.fb.group({
            name: [this.profile.name ? this.profile.name: '', Validators.required],
            picture: [this.profile.photoURL ? this.profile.photoURL: '', Validators.required],
            email: [this.profile.email ? this.profile.email: '', Validators.required],
            address: [this.profile.address ? this.profile.address: '', Validators.required],
            phone: [this.profile.phone ? this.profile.phone: '', Validators.required],
        });
  }

  isAllValExist() {
      const val = this.form.value;
      return val && val.name && val.picture && val.email && val.address && val.phone
  }

  edit(){
    const val = this.form.value;
    let data = {uid: this.uid, name: val.name, email: val.email, isAdmin: false, photoURL: val.picture, address: val.address, phone: val.phone}
    this.usersService.editUser(data,  this.userKey)
                    .subscribe(()=>this._service.success(
                            'User was edited successfully',
                            'Continue shopping',
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                            }
                        ))
    localStorage.setItem('profile', JSON.stringify(data))
    this.router.navigate(['/shopping-cart'])
  }

  cancel(){
    this.isEditable = false
    this.onCancel.emit(this.isEditable)
  }
}
