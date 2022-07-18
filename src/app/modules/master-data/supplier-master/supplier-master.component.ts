import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { supplerMasterService } from './supplier-master.service';

@Component({
  selector: 'app-supplier-master',
  templateUrl: './supplier-master.component.html',
  styleUrls: ['./supplier-master.component.css']
})
export class SupplierMasterComponent implements OnInit {
  supplierMasterform!: FormGroup;
  displayColumns: string[] = ['Supplier_Key', 'Supplier_Name', 'City_Name', 'State_Name', 'Country_Name', 'Supplier_Email_ID', 'Supplier_Contact_Details', 'Status', 'Actions']
  supplierMasterData!: MatTableDataSource<any>;
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  constructor(
    private router: Router, private formBuilder: FormBuilder, private supplierMasterService: supplerMasterService
  ) { }

  ngOnInit(): void {
    this.supplierMasterform = this.formBuilder.group({
      country: [""],
      state: [""],
      city: [''],
      storeName: [''],
      supplierID: [''],
      supplierName: ['']
    });
  }
  backButtonClick() {
    this.router.navigate(['masters']);
  }

  onSupplierMasterSubmit() {
    let obj = {
      "Country_Name": this.supplierMasterform.value.country,
      "State_Name": this.supplierMasterform.value.state,
      "City_Name": this.supplierMasterform.value.city,
      "Supplier_Key": this.supplierMasterform.value.supplierID,
      "Supplier_Name": this.supplierMasterform.value.supplierName
    }
    this.supplierMasterService.getStores(obj).subscribe((response) => {
      console.log(response);
      this.supplierMasterData = new MatTableDataSource(response[0]);
      this.supplierMasterData.paginator = this.paginator;
      this.supplierMasterData.sort = this.sort;
    })
  }
}
