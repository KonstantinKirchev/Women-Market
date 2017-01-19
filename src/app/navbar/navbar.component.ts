import { Component, OnInit } from '@angular/core'
import { AuthService } from '../shared/security/auth.service'
import { UsersService } from '../shared/services/users.service'
import { NotificationsService } from "angular2-notifications"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categories: string[] = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Meats']
  category: string

  constructor(private auth: AuthService, private usersService: UsersService, private _service: NotificationsService) { }

  ngOnInit() {
  }

  logout() {
      this.auth.logout();
      localStorage.setItem('shopping-cart', JSON.stringify([]))
      this._service.info(
                          'Thank you for shopping with us',
                          'See you soon. Bye :)',
                          {
                              timeOut: 3000,
                              showProgressBar: true,
                              pauseOnHover: false,
                              clickToClose: true
                          }
                      )
  }

  getValue(category){
    localStorage.setItem('category', category.toLowerCase());
  }

}
