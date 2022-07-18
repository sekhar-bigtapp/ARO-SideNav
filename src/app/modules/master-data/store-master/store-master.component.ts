import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { storeMasterService } from './store-master.service';

@Component({
  selector: 'app-store-master',
  templateUrl: './store-master.component.html',
  styleUrls: ['./store-master.component.css']
})
export class StoreMasterComponent implements OnInit {
  storeMasterform!: FormGroup;
  displayColumns: string[] = ['Store_Key', 'Store_Name', 'Store_City', 'Store_State', 'Store_Country', 'Store_Lattitude', 'Store_Longitude', 'Actions']
  storeData!: MatTableDataSource<any>;
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  constructor(
    private router: Router, private formBuilder: FormBuilder, private storeMasterService: storeMasterService
  ) { }

  ngOnInit(): void {
    this.storeMasterform = this.formBuilder.group({
      country: [""],
      state: [""],
      city: [''],
      storeId: [''],
      storeName: ['']
    });
  }
  backButtonClick() {
    this.router.navigate(['masters']);
  }
  onStoreMasterSubmit() {
    let obj = {
      "Store_Country": this.storeMasterform.value.country,
      "Store_State": this.storeMasterform.value.state,
      "Store_City": this.storeMasterform.value.city,
      "Store_Key": this.storeMasterform.value.storeId,
      "Store_Name": this.storeMasterform.value.storeName
    }
    this.storeMasterService.getStores(obj).subscribe((response) => {
      console.log(response);
      this.storeData = new MatTableDataSource(response[0]);
      this.storeData.paginator = this.paginator;
      this.storeData.sort = this.sort;
    })
  }
}
