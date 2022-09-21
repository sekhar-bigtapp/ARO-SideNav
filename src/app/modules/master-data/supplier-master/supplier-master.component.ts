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
  displayColumns: string[] = ['Supplier_ID', 'Name', 'Supplier_Country', 'Supplier_Region', 'Supplier_City', 'Email', 'Contact_Number', 'Actions']
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
      supplierID: [''],
      supplierName: ['']
    });
  }
  backButtonClick() {
    this.router.navigate(['masters']);
  }

  onSupplierMasterSubmit() {
    let obj = {
      "Supplier_Country": this.supplierMasterform.value.country,
      "Supplier_Region": this.supplierMasterform.value.state,
      "Supplier_City": this.supplierMasterform.value.city,
      "Supplier_ID": this.supplierMasterform.value.supplierID,
      "Name": this.supplierMasterform.value.supplierName
    }
    this.supplierMasterService.getStores(obj).subscribe((response) => {
      console.log(response);
      this.supplierMasterData = new MatTableDataSource(response[0]);
      this.supplierMasterData.paginator = this.paginator;
      this.supplierMasterData.sort = this.sort;
    })
  }
}
