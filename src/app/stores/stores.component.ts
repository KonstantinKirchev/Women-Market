import { Component, OnInit } from '@angular/core';
import { StoresService } from "../shared/services/stores.service";

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  stores: any

  constructor(private storesService: StoresService) { }

  ngOnInit() {
    this.storesService.findAllStores().subscribe((res)=> this.stores = res)
  }

}
