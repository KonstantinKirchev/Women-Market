import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { AuthService } from "../shared/security/auth.service";
import { Router } from "@angular/router";
import { UsersService } from "../shared/services/users.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private usersService: UsersService) {

      this.form = this.fb.group({
          email: ['',[Validators.required, Validators.pattern('[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}')]],
          password: ['',[Validators.required, Validators.minLength(6)]],
          confirm: ['',[Validators.required, Validators.minLength(6)]]
      });


  }

    isPasswordMatch() {
        const val = this.form.value;
        return val && val.password && val.password == val.confirm;
    }

    signUp() {
        const val = this.form.value;

        this.authService.signUp(val.email, val.password)
            .then(
                (authResult: any) => {
                    this.router.navigateByUrl('/');
                    let email = authResult.auth.email;
                    let name = email.substring(0, email.lastIndexOf("@"));
                    let profile = {displayName: name, email: email, photoURL: ''}
                    localStorage.setItem('profile', JSON.stringify(profile));
                    localStorage.setItem('username', name);
                    localStorage.setItem('user_id', authResult.uid);
                    let data = {uid: authResult.uid, name: name, email: email, isAdmin: false}
                    this.usersService.addUser(JSON.stringify(data)).subscribe(()=>console.log('User added.'));
                },
                err => alert(err)
            );
    }
}
