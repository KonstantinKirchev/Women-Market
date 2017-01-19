import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from "@angular/forms"
import { AuthService } from "../shared/security/auth.service"
import { UsersService } from "../shared/services/users.service"
import { Router } from "@angular/router"
import { AngularFire } from 'angularfire2'
import { GlobalValidator } from "../shared/security/global-validator"
import { NotificationsService } from "angular2-notifications"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  profile: {}

  constructor(private fb:FormBuilder, private authService: AuthService, public af: AngularFire,
                private router:Router, private usersService: UsersService, private _service: NotificationsService) {

      this.form = this.fb.group({
          email: ['',[Validators.required, GlobalValidator.mailFormat]],
          password: ['',[Validators.required, Validators.minLength(6)]]
      });

      
  }

  ngOnInit() {
  }

  isAllValExist() {
      const val = this.form.value;
      return val && val.password && val.email;
  }


  login() {
      const formValue = this.form.value;
     
      this.authService.login(formValue.email, formValue.password)
      .then((authResult: any) => {
        this.router.navigate(['/'])
        let emailResult = authResult.auth.email
        let nameResult = emailResult.substring(0, emailResult.lastIndexOf("@"));
        localStorage.setItem('profile', JSON.stringify(authResult.auth));
        localStorage.setItem('username', nameResult);
        localStorage.setItem('shopping-cart', JSON.stringify([]))
        this._service.info(
                          'Welcome back '+ nameResult,
                          'Happy shopping :)',
                          {
                              timeOut: 3000,
                              showProgressBar: true,
                              pauseOnHover: false,
                              clickToClose: true
                          }
                      )
      })
      .catch((err)=>{
        this.router.navigate(['/login'])
        this._service.error(
                          'Invalid email or password.',
                          'Please try again.',
                          {
                              timeOut: 3000,
                              showProgressBar: true,
                              pauseOnHover: false,
                              clickToClose: true
                          }
                      )
      });
  }

  loginWithGoogle(){
    this.authService.signInWithGoogle()
      .then((authResult: any) => {
        this.router.navigate(['/'])
        localStorage.setItem('profile', JSON.stringify(authResult.auth))
        localStorage.setItem('shopping-cart', JSON.stringify([]))
        //let data = {uid: authResult.auth.uid, name: authResult.auth.displayName, email: authResult.auth.email, isAdmin: false}
        //this.usersService.findUserById(authResult.auth.uid).subscribe((result)=>console.log(result));
        //this.usersService.addUser(JSON.stringify(data)).subscribe(()=>console.log('User added.'));
      });
  }

}
