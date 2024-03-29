import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductMasterService } from './product-master.service';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
  
})
export class ProductMasterComponent implements OnInit {
  productdata!: MatTableDataSource<any>;
  displayColumns: string[] = ['Product_name', 'SKU_ID', 'Category', 'SubCategory', 'Pack_size', 'Actions'];
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  productMasterForm!: FormGroup;

  constructor(
    private router: Router,
    private productMasterService: ProductMasterService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.productMasterForm = this.formBuilder.group({
      productName: [""],
      productCategories: [""],
      SKUCode: [''],
      productStatus: ['']
    });
  }
  backButtonClick() {
    this.router.navigate(['masters']);
  }

  onProductMasterSubmit() {
    let data = {
      "Product_name": this.productMasterForm.value.productName,
      "Category": this.productMasterForm.value.productCategories,
      "Status": this.productMasterForm.value.productStatus,
      "SKU_ID": this.productMasterForm.value.SKUCode,
     
    }
    this.productMasterService.getproductMasterData(data).subscribe((response) => {
      console.log(response);
      this.productdata = new MatTableDataSource(response[0]);
      this.productdata.paginator = this.paginator;
      this.productdata.sort = this.sort;
    })
  }
  onProdEdit(element: any) { }

  onProdSave(element: any) { }
}

