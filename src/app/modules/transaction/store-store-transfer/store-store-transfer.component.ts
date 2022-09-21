import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StoreTransferService } from './store-store-transfer.services';

@Component({
  selector: 'app-store-store-transfer',
  templateUrl: './store-store-transfer.component.html',
  styleUrls: ['./store-store-transfer.component.css']
})
export class StoreStoreTransferComponent implements OnInit {
  storeTransferfrom!: FormGroup;
  displayColumns: string[] = ['Product_name', 'SKU_ID', 'Store_Name', 'Store_ID', 'Physical_Stock_on_Hand','Transfer_Qty','Transfer_to_Store','Actions']
  storeTransferMasterData!: MatTableDataSource<any>;
  pageSize = 10;
  storeNameList: any;
  productNameList: any;
  overridestore: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  pipe = new DatePipe('en-US');
  Time_Key = new Date();

  constructor(
    private router: Router,private formBuilder: FormBuilder, private storetransferservice: StoreTransferService
  ) { }

  ngOnInit(): void {
    this.storeTransferfrom = this.formBuilder.group({
      Time_Key: [""],
      Store_Name: [""],
      Store_Key: [""],
      SKU_ID: [''],
      Product_Name: [''],
      Product_Key: [''],
      transferqty: [''],
     
    });
    this.getStoresNamesList();
    this.getProductNamesList();
  }
  getStoresNamesList() {
    this.storetransferservice.getStoreNames().subscribe((response) => {
      console.log(response);
      this.storeNameList = response;
    });

  }

  getProductNamesList(){
    this.storetransferservice.getProductNames().subscribe((response) => {
      console.log(response);
      this.productNameList = response;
    });
  }
 

  onStoreSupplierMasterSubmit() {
    let obj = {
      "Date": this.pipe.transform(this.storeTransferfrom.value.Time_Key, 'yyyy-MM-dd'),
      "Store_Name": this.storeTransferfrom.value.Store_Name,
      "Store_ID": this.storeTransferfrom.value.Store_Key,
      "SKU_ID": this.storeTransferfrom.value.SKU_ID,
      "Product_name":this.storeTransferfrom.value.Product_Name,
      // "Product_Key": this.storeTransferfrom.value.Product_Key,
      // "transferqty": "",
      // "Transfer_Qty_Name":this.storeTransferfrom.value.Store_Name,
    }
    this.storetransferservice.getStoreTransferName(obj).subscribe((response) => {
      console.log(response);  
      this.storeTransferMasterData = new MatTableDataSource(response[0]);
      this.storeTransferMasterData.paginator = this.paginator;
      this.storeTransferMasterData.sort = this.sort;
    })
  }
  onProdEdit(product: any) {
    product.editMode = true;     
  }
  onProdSave(product: any) {   
    const myFormattedDate = this.pipe.transform(product.Time_Key, 'yyyy-MM-dd');
    const Transfer_Qty=this.storeTransferfrom.value.transferqty;
    const Store_Name= this.storeTransferfrom.value.Store_Name;
    let prodObj = {
      "Time_Key": myFormattedDate,
      "from_store_key": product.Store_Key,
      "to_store_key":Store_Name,
      "Product_Key": product.Product_Key,      
      "transferqty":Transfer_Qty,      
    }
    console.log(prodObj)
    this.storetransferservice.saveProduct(prodObj).subscribe((response) => {
      console.log(response);
      this.overridestore = undefined;
      product.editMode = false;
      this.storeTransferfrom.value.Store_Name= "";      
      this.onStoreSupplierMasterSubmit();
    });
  } 
  
  backButtonClick(){
    this.router.navigate(['transaction']);
  }
}
