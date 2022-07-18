import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './storeservice';
import { subscribeOn } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  processForm!: FormGroup;
  displayColumns: string[] = ['Store_Name', 'Product_Name', 'SKU_ID', 'Re_Order_Quantity', 'OverriderReorderQty', 'Expected_delivary_Date', 'Supplier_Name', 'Actions']
  processData!: MatTableDataSource<any>;
  overrideReorder!: any;
  pipe = new DatePipe('en-US');
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  minDate = new Date();
  storeNameList: any;
  constructor(private http: HttpClient, private storeService: StoreService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.processForm = this.formBuilder.group({
      date: [""],
      storeName: [""],
      ProductCateg: [''],
      SubCategories: [''],
      abcClass: [''],
      ProductName: [''],
      SKU_CODE: ['']
    });
    this.getStoresNamesList();
  }

  getStoresNamesList() {
    this.storeService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.storeNameList = response;
    });

  }
  onSubmit() {
    console.log(this.processForm.value);
    let obj = {
      "Date": this.pipe.transform(this.processForm.value.date, 'yyyy-MM-dd'),
      "Store_Name": this.processForm.value.storeName,
      "Category_Name": this.processForm.value.ProductCateg,
      "Subcategory_Name": this.processForm.value.SubCategories,
      "Product_Name": this.processForm.value.ProductName,
      "SKU_ID": this.processForm.value.SKU_CODE
    }
    console.log(obj)
    this.storeService.searchStores(obj).subscribe((response) => {
      for (let prod of response[0]) {
        prod.editMode = false;
      }
      this.processData = new MatTableDataSource(response[0]);
      console.log(this.processData);
      this.processData.paginator = this.paginator;
      this.processData.sort = this.sort;
    })
  }

  onProdEdit(product: any) {
    product.editMode = true;
    this.overrideReorder = product.Re_Order_Quantity;
  }

  onProdSave(product: any) {
    const myFormattedDate = this.pipe.transform(product.Time_key, 'yyyy-MM-dd');
    let prodObj = {
      "Time_Key": myFormattedDate,
      "Store_Key": product.Store_Key,
      "Product_Key": product.Product_Key,
      "Override_RQ": this.overrideReorder
    }
    console.log(prodObj)
    this.storeService.saveProduct(prodObj).subscribe((response) => {
      console.log(response);
      this.onSubmit();
      this.overrideReorder = undefined;
      product.editMode = false;
    });
  }

}
