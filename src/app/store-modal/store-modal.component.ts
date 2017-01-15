import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-modal',
  templateUrl: './store-modal.component.html',
  styleUrls: ['./store-modal.component.css'],
  inputs: ['store']
})
export class StoreModalComponent implements OnInit {

  store: any

  constructor() { }

  ngOnInit() {
  }

}
