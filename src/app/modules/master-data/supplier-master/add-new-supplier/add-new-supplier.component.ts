import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { supplerMasterService } from '../supplier-master.service';

@Component({
  selector: 'app-add-new-supplier',
  templateUrl: './add-new-supplier.component.html',
  styleUrls: ['./add-new-supplier.component.css']
})
export class AddNewSupplierComponent implements OnInit {
  addNewSupplierForm!:FormGroup

  validation_messages = {
    Supplier_Key: [
      { type: 'required', message: 'Please Enter Supplier Id' },
    ],
    Supplier_Name: [
      { type: 'required', message: 'Please Enter Supplier Name' },
    ],
    Supplier_Email_ID: [
      { type: 'required', message: 'Please Enter email' },
      { type: 'pattern', message: 'Please enter valid Email ID' },
    ],
    
    Country_Name: [
      { type: 'required', message: 'Please Enter Country Name' },
    ],
    Supplier_Region:[
      { type: 'required', message: 'Please Enter Region Name' },
    ],
    City_Name: [
      { type: 'required', message: 'Please Enter City Name' },
    ],
    Supplier_Latitude: [
      { type: 'required', message: 'Please Enter Supplier Latitude' },
    ],
    Supplier_Longitude: [
      { type: 'required', message: 'Please Enter Supplier Longitude' },
    ],
    // Status: [
    //   { type: 'required', message: 'Please Select Status' },
    // ],
  };

  constructor(
    private router: Router,
    private supplerMasterService : supplerMasterService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addNewSupplierForm = this.formBuilder.group({
      Supplier_Key: ["",Validators.required], 
      Supplier_Name: ["",Validators.required],
      Supplier_Email_ID: ['', Validators.compose([Validators.required, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)])],
      Supplier_Contact_Details: [''],
      Supplier_Region: ['',Validators.required],
      Country_Name: ['',Validators.required],
      City_Name: ['',Validators.required],
      Supplier_Latitude:['', Validators.required],
      Supplier_Longitude:['',Validators.required],

      // Status: ['',Validators.required],
    });
  }onNewSupplierSubmit() {
    debugger
    let obj = {
      "Supplier_ID": this.addNewSupplierForm.value.Supplier_Key,
      "Name": this.addNewSupplierForm.value.Supplier_Name,
      "mailto:email": this.addNewSupplierForm.value.Supplier_Email_ID,
      "Contact_Number": this.addNewSupplierForm.value.Supplier_Contact_Details,
      "Supplier_Region": this.addNewSupplierForm.value.Supplier_Region,
      "Supplier_Country": this.addNewSupplierForm.value.Country_Name,
      "Supplier_City": this.addNewSupplierForm.value.City_Name,
      // "Status": this.addNewSupplierForm.value.Status,
      "Supplier_Latitude" : this.addNewSupplierForm.value.Supplier_Latitude,
      "Supplier_Longitude" : this.addNewSupplierForm.value.Supplier_Longitude,   
    }
    this.supplerMasterService.addNewSupplierData(obj).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/suppliermaster')
     
    })
  }

}
