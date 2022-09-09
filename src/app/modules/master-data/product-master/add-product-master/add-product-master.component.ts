import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductMasterService } from '../product-master.service';

@Component({
  selector: 'app-add-product-master',
  templateUrl: './add-product-master.component.html',
  styleUrls: ['./add-product-master.component.css']
})
export class AddProductMasterComponent implements OnInit {
  addproductMasterForm!: FormGroup;
  validation_messages = {
    SKU_ID: [
      { type: 'required', message: 'Please Enter SKU ID' },
    ],
    Product_Name: [
      { type: 'required', message: 'Please Enter Product_Name' },
    ],
    Category_Name: [
      { type: 'required', message: 'Please Enter Category Name' },
    ],
    Subcategory_Name: [
      { type: 'required', message: 'Please Enter Sub Category Name' },
    ],
    Package_Size: [
      { type: 'required', message: 'Please Enter Pack Size' },
    ],
    Status: [
      { type: 'required', message: 'Please Select Status' },
    ],
    NewProduct: [
      { type: 'required', message: 'Please Select NewProduct' },
    ],
    Store_Key: [
      { type: 'required', message: 'Please Select Store_Key' },
    ],
    Supplier_Key: [
      { type: 'required', message: 'Please Select Supplier_Key' },
    ],
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private productMasterService: ProductMasterService
  ) { }
 
  ngOnInit(): void {
    this.addproductMasterForm = this.formBuilder.group({
      Product_Key: [""],
      Product_Name: ["", Validators.required],
      Category_Name: ["", Validators.required],
      Subcategory_Name: ["", Validators.required],
      Product_Description: [""],
      SKU_ID: ["", Validators.required],
      Brand_Description: [""],
      Storage_Type: [""],
      Package_Size: ["", Validators.required],
      Package_Details: [""],
      Dimensions: [""],
      weight: [""],
      NewProduct: ["", Validators.required],
      Status: ["", Validators.required],
      Supplier_Key: ["", Validators.required],
      Store_Key: ["", Validators.required],
   

    });
  }

  onAddProductMasterSubmit() {
    alert();
    debugger;
    let Obj = {
      "Product_Key": this.addproductMasterForm.value.Product_Key,
      "Product_Name": this.addproductMasterForm.value.Product_Name,
      "Category_Name": this.addproductMasterForm.value.Category_Name,
      "Subcategory_Name": this.addproductMasterForm.value.Subcategory_Name,
      "Product_Description":this.addproductMasterForm.value.Product_Description,
      "SKU_ID": this.addproductMasterForm.value.SKU_ID,
      "Brand_Description":this.addproductMasterForm.value.Brand_Description,
      "Storage_Type": this.addproductMasterForm.value.Storage_Type,
      "Package_Size": this.addproductMasterForm.value.Package_Size,
      "Package_Details": this.addproductMasterForm.value.Package_Details,
      "Dimensions": this.addproductMasterForm.value.Dimensions,
      "weight": this.addproductMasterForm.value.weight,
      "NewProduct": this.addproductMasterForm.value.NewProduct,
      "Status": this.addproductMasterForm.value.Status,
      "Supplier_Key": this.addproductMasterForm.value.Supplier_Key,
      "Store_Key": this.addproductMasterForm.value.Store_Key,



    }
    this.productMasterService.addNewproductMasterData(Obj).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/productmaster')
    })

  }
}
