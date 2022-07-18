import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forecastService } from '../configuration/forecasted-config/forecast-service';
import { StoreToStoreTransferConfigService } from '../configuration/store-store-transfer-config/store-store-transfer-config.service';
import { StoreService } from '../process/storeservice';
import { PhysicalStockCheckService } from '../transaction/physical-stock-check/physical-stock-check.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayColumnsReorder: string[] = ['Product_Name', 'Re_Order_Quantity', 'OverriderReorderQty', 'Supplier_Name', 'Actions']
  displayColumnsPhysicalStock: string[] = ['Product', 'Store_name', 'Beginning_Stock', 'Physical_Stock_Check'];
  displayColumnsStoreTranser: string[] = ['Store_Name', 'Distance', 'Store_Store_Transferd_Config', 'Actions']
  displayColumnsForcastConfig: string[] = ['Time_Key', 'Store_Name', 'Product_Name', 'Category_Name', 'Sales_Volume', 'Forecasted_Volume', 'NewForcastVolume'];
  processData!: MatTableDataSource<any>;
  physicalStockCheckData!: MatTableDataSource<any>;
  storeTransferData!: MatTableDataSource<any>;
  forecastMasterData!: MatTableDataSource<any>;
  overrideReorder!: any;
  pipe = new DatePipe('en-US');
  pageSizeReorder = 5;
  pageSizePhysicalStock = 5;
  pageSizeStoreTranser = 5;
  pageSizeForcastConfig = 5;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  isPTenValue: boolean = true;
  isPFiftyValue: boolean = false;
  isPNintyValue: boolean = false;

  constructor(public storeService: StoreService,
    public physicalStockCheckService: PhysicalStockCheckService,
    public storeToStoreTransferService: StoreToStoreTransferConfigService,
    public forecastMasterService: forecastService
  ) { }

  ngOnInit(): void {
    this.getReorderData();
    this.getPhysicalStock();
    this.getStoreTransfer();
    this.getForcastConfig();
    if (localStorage.getItem("isPTenValue") && localStorage.getItem("isPTenValue") == "true") {
      this.isPTenValue = true;
      this.isPFiftyValue = false;
      this.isPNintyValue = false;
    }
    if (localStorage.getItem("isPFiftyValue") && localStorage.getItem("isPFiftyValue") == "true") {
      this.isPTenValue = false;
      this.isPFiftyValue = true;
      this.isPNintyValue = false;
    }
    if (localStorage.getItem("isPNintyValue") && localStorage.getItem("isPNintyValue") == "true") {
      this.isPTenValue = false;
      this.isPFiftyValue = false;
      this.isPNintyValue = true;
    }
    console.log(this.isPTenValue, this.isPFiftyValue, this.isPNintyValue)
  }

  getReorderData() {
    const myFormattedDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    let obj = {
      "Date": "2022-01-01",
      "Category_Name": "",
      "Subcategory_Name": "",
      "Product_Name": "",
      "SKU_ID": ""
    }
    this.storeService.searchStores(obj).subscribe((response) => {
      for (let prod of response[0]) {
        prod.editMode = false;
      }
      this.processData = new MatTableDataSource(response[0]);
      console.log(this.processData);
      this.processData.paginator = this.paginator.toArray()[0];
      this.processData.sort = this.sort.toArray()[0];
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
      this.getReorderData();
      this.overrideReorder = undefined;
      product.editMode = false;
    });
  }

  getPhysicalStock() {
    let inputObj = {
      "Product": "SAMSUNG 40-inch Class LED Smart FHD TV 1080P",
      "Store_ID": "4"
    }
    this.physicalStockCheckService.getPhysicalStockCheck(inputObj).subscribe((response) => {
      console.log(response);
      this.physicalStockCheckData = new MatTableDataSource(response);
      this.physicalStockCheckData.paginator = this.paginator.toArray()[1];
      this.physicalStockCheckData.sort = this.sort.toArray()[1];
    })
  }


  getStoreTransfer() {
    let obj = {
      "Store_Name": "",
      "Store_ID": "",
      "Distance": ""
    }
    this.storeToStoreTransferService.getStoreTransferData(obj).subscribe((response => {
      // for (let store of response) {
      //   store.Edit = false;
      // }
      this.storeTransferData = new MatTableDataSource(response[0]);
      this.storeTransferData.paginator = this.paginator.toArray()[2];
      this.storeTransferData.sort = this.sort.toArray()[2];
    }))

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
      this.getStoreTransfer();
    }))
  }

  onDistanceChange(element: any, event: any) {
    console.log(element.Distance);
    console.log(event.target.value);
    element.Distance = event.target.value;
  }

  onSave(el: any) {
    let obj = {
      "id": el.id,
      "Distance": el.Distance,
      "Store_Store_Transferd_Config": el.Store_Store_Transferd_Config
    }
    this.storeToStoreTransferService.saveStoreTransfer(obj).subscribe((response => {
      console.log(response);
      this.getStoreTransfer();
    }))
  }

  getForcastConfig() {
    let obj = {
      "Date": "2022-01-01",
      "Store_Name": "",
      "Category_Name": "",
      "Subcategory_Name": "",
      "SKU_ID": "",
      "Product_Name": ""
    }
    this.forecastMasterService.getStores(obj).subscribe((response) => {
      console.log(response);
      this.forecastMasterData = new MatTableDataSource(response[0]);
      this.forecastMasterData.paginator = this.paginator.toArray()[3];
      this.forecastMasterData.sort = this.sort.toArray()[3];
    })
  }
}
