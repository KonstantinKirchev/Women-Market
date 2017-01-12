import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "../shared/security/auth.service";
import { Router } from "@angular/router";
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  profile: {}

  constructor(private fb:FormBuilder, private authService: AuthService, public af: AngularFire,
                private router:Router) {

      this.form = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required]
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
      });
  }

  loginWithGoogle(){
    this.authService.signInWithGoogle()
      .then((authResult: any) => {
        this.router.navigate(['/'])
        localStorage.setItem('profile', JSON.stringify(authResult.auth));
      });
  }

}
