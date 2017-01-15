import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any
  isEditable: boolean

  constructor() {
  }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'))
    //console.log(this.profile)
    let name = this.profile.email.substring(0, this.profile.email.lastIndexOf("@"))
    this.profile.displayName = name
    this.isEditable = false
  }

  editProfile(){
    this.isEditable = true
  }
}
