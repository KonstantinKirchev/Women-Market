import { Component, OnInit } from '@angular/core'
import { StoresService } from "../shared/services/stores.service"
import { AuthService } from '../shared/security/auth.service'
import { Router } from "@angular/router"
import { NotificationsService } from "angular2-notifications"

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  stores: any

  constructor(private storesService: StoresService, 
              private auth: AuthService,
              private router: Router,
              private _service: NotificationsService) { }

  ngOnInit() {
    this.storesService.findAllStores().subscribe((res)=> this.stores = res)
  }

  editStore(store){
    this.router.navigate(['/stores/edit/' + store.$key])
  }

  deleteStore(key){
    this.storesService.deleteStore(key)
    .subscribe(
      ()=>this._service.success(
                            'The product was deleted successfully',
                            'Continue editing/deleting',
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                            }
                        ),
        err => this._service.error(
                            'This product cannot be deleted',
                             err,
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true
                            }
                        ),
          () => console.log('Finished'));
  }

}
