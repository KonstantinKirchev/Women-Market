import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/security/auth.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isAdmin: boolean

  constructor(private auth: AuthService, private usersService: UsersService) { }

  ngOnInit() {
    
  }

  logout() {
      this.auth.logout();
  }

}
