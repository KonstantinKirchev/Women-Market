import { Component, OnInit, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "../shared/security/auth.service";
import { UsersService } from "../shared/services/users.service";
import { Router } from "@angular/router";
import { AngularFire } from 'angularfire2';

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
              private router:Router, private usersService: UsersService) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            picture: ['', Validators.required],
            email: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', Validators.required],
        });
  }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'))
    this.uid = this.profile.uid
    this.usersService.findUserById(this.uid)
                      .subscribe((result)=>{
                        this.userKey = result.$key
                      })
  }

  isAllValExist() {
      const val = this.form.value;
      return val && val.name && val.picture && val.email && val.address && val.phone
  }

  edit(){
    const val = this.form.value;
    let data = {uid: this.uid, name: val.name, email: val.email, isAdmin: false, photoURL: val.picture, address: val.address, phone: val.phone}
    this.usersService.editUser(data,  this.userKey).subscribe(()=>console.log('User edited.'))
    localStorage.setItem('profile', JSON.stringify(data))
  }

  cancel(){
    this.isEditable = false
    this.onCancel.emit(this.isEditable)
  }
}
