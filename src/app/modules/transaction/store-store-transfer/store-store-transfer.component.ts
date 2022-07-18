import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-store-transfer',
  templateUrl: './store-store-transfer.component.html',
  styleUrls: ['./store-store-transfer.component.css']
})
export class StoreStoreTransferComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  backButtonClick(){
    this.router.navigate(['transaction']);
  }
}
