import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StoreToStoreTransferConfigService } from './store-store-transfer-config.service';

@Component({
  selector: 'app-store-store-transfer-config',
  templateUrl: './store-store-transfer-config.component.html',
  styleUrls: ['./store-store-transfer-config.component.css']
})
export class StoreStoreTransferConfigComponent implements OnInit {
  storeTransferForm!: FormGroup;
  displayColumns: string[] = ['Store_ID', 'Store_Name', 'Distance', 'Store_Store_Transferd_Config', 'Actions']
  storeTransferData!: MatTableDataSource<any>;
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private storeToStoreTransferService: StoreToStoreTransferConfigService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.getStoreTransferData();
    this.storeTransferForm = this.formBuilder.group({
      storeID: [""],
      storeName: [""],
      distance: [''],
    });
  }

  onStoreTransferSubmit() {
    let obj = {
      "Store_Name": this.storeTransferForm.value.storeName,
      "Store_ID": this.storeTransferForm.value.storeID,
      "Distance": this.storeTransferForm.value.distance
    }
    this.storeToStoreTransferService.getStoreTransferData(obj).subscribe((response => {
      // for (let store of response) {
      //   store.Edit = false;
      // }
      this.storeTransferData = new MatTableDataSource(response[0]);
      this.storeTransferData.paginator = this.paginator;
      this.storeTransferData.sort = this.sort;
    }))
  }

  OnStoreEdit(store: any) {
    console.log(store);
    store.Edit = true;
  }

  OnStoreSave(store: any) {
    console.log(store);
  }

  onChange(el: any, event: any) {
    console.log(el);
    console.log(event.checked);
    let obj: any;
    if (event.checked) {
      obj = {
        "id": el.id,
        "Distance": el.Distance,
        "Store_Store_Transferd_Config": 1
      }
    } else {
      obj = {
        "id": el.id,
        "Distance": el.Distance,
        "Store_Store_Transferd_Config": 0
      }
    }
    this.storeToStoreTransferService.saveStoreTransfer(obj).subscribe((response => {
      console.log(response);
      this.onStoreTransferSubmit();
    }))
  }

  onDistanceChange(element: any, event: any) {
    console.log(element.Distance);
    console.log(event.target.value);
    element.Distance = event.target.value;
  }

  onSave(el: any){
    let obj = {
      "id": el.id,
      "Distance": el.Distance,
      "Store_Store_Transferd_Config": el.Store_Store_Transferd_Config
    }
    this.storeToStoreTransferService.saveStoreTransfer(obj).subscribe((response => {
      console.log(response);
      this.onStoreTransferSubmit();
    }))
  }
}

