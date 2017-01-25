import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
  inputs: ['client']
})

export class UserModalComponent implements OnInit {

  client: any 
  
  
  constructor() { }

  ngOnInit() {
  }

}
