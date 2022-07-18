import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { forecastService } from './forecast-service';

@Component({
  selector: 'app-forecasted-config',
  templateUrl: './forecasted-config.component.html',
  styleUrls: ['./forecasted-config.component.css']
})
export class ForecastedConfigComponent implements OnInit {

  pipe = new DatePipe('en-US');
  forecastForm!: FormGroup;
  displayColumns: string[] = ['Time_Key', 'Store_Name', 'Product_Name',  'Sales_Volume', 'p10', 'p50', 'p90', 'p10Variance', 'p50Variance', 'p90Variance'];
  forecastMasterData!: MatTableDataSource<any>;
  pageSize = 10;
  isPTenValue: boolean = true;
  isPFiftyValue: boolean = false;
  isPNintyValue: boolean = false;
  storeNameList: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private router: Router, private formBuilder: FormBuilder,
    private forecastMasterService: forecastService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.forecastForm = this.formBuilder.group({

      Date: [""],
      Store_Name: [""],
      Category_Name: [""],
      Subcategory_Name: [''],
      Product_Name: [''],
      SKU_ID: [''],
    });
    this.getStoresNamesList();
  }
  backButtonClick() {
    this.router.navigate(['configurations']);
  }
  getStoresNamesList() {
    this.forecastMasterService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.storeNameList = response;
    });

  }

  onforecastMasterClick() {
    let obj = {

      "Date": this.forecastForm.value.Date,
      "Store_Name": this.forecastForm.value.Store_Name,
      "Category_Name": this.forecastForm.value.Category_Name,
      "Subcategory_Name": this.forecastForm.value.Subcategory_Name,
      "SKU_ID": this.forecastForm.value.SKU_ID,
      "Product_Name": this.forecastForm.value.Product_Name,

    }
    this.forecastMasterService.getStores(obj).subscribe((response) => {
      console.log(response);
      for (let resp of response[0]) {
        resp.Time_Key = this.datepipe.transform(resp.Time_Key, 'yyyy-MM-dd hh:mm:ss');
      }
      this.forecastMasterData = new MatTableDataSource(response[0]);
      this.forecastMasterData.paginator = this.paginator;
      this.forecastMasterData.sort = this.sort;
    })
  }

  onPClick(value: any) {
    if (value == 'P10') {
      this.isPTenValue = true;
      this.isPFiftyValue = false;
      this.isPNintyValue = false;
      localStorage.setItem("isPTenValue", "true");
      localStorage.setItem("isPFiftyValue", "false");
      localStorage.setItem("isPNintyValue", "false");
    } else if (value == 'P50') {
      this.isPTenValue = false;
      this.isPFiftyValue = true;
      this.isPNintyValue = false;
      localStorage.setItem("isPTenValue", "false");
      localStorage.setItem("isPFiftyValue", "true");
      localStorage.setItem("isPNintyValue", "false");
    } else if (value == 'P90') {
      this.isPTenValue = false;
      this.isPFiftyValue = false;
      this.isPNintyValue = true;
      localStorage.setItem("isPTenValue", "false");
      localStorage.setItem("isPFiftyValue", "false");
      localStorage.setItem("isPNintyValue", "true");
    }
  }

}
