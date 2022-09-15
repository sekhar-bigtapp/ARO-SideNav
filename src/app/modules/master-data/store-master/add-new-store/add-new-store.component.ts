import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { storeMasterService } from '../store-master.service';

@Component({
  selector: 'app-add-new-store',
  templateUrl: './add-new-store.component.html',
  styleUrls: ['./add-new-store.component.css']
})
export class AddNewStoreComponent implements OnInit {
  addstoreMasterform!: FormGroup; 
  validation_messages = {
    Store_Key: [
      { type: 'required', message: 'Please Enter Store Id' },
    ],
    Store_Name: [
      { type: 'required', message: 'Please Enter Store Name' },
    ],
    Store_City: [
      { type: 'required', message: 'Please Enter Store City' },
    ],
    Store_State: [
      { type: 'required', message: 'Please Enter Store State' },
    ],
    Store_Country: [
      { type: 'required', message: 'Please Enter Store Country' },
    ],
    Store_Lattitude: [
      { type: 'required', message: 'Please Enter Store Lattitude' },
    ],
    Store_Longitude: [
      { type: 'required', message: 'Please Enter Store Longitude' },
    ],
    Status: [
      { type: 'required', message: 'Please Enter Status' },
    ],
    
    
  };
  
 
  constructor(
    private router: Router, private formBuilder: FormBuilder, private storeMasterService: storeMasterService
  ) { }

  ngOnInit(): void {
    this.addstoreMasterform = this.formBuilder.group({
      Store_Key: ['',Validators.required],
      Store_Name: ['',Validators.required],
      Store_City: ['',Validators.required],
      Store_State: ['',Validators.required],
      Store_Country: ['',Validators.required],
      Store_Lattitude: ['',Validators.required],
      Store_Longitude: ['',Validators.required],
     
    });
  }
 
  onAddStoreMasterSubmit() {
    let obj = {
      "Store_ID":this.addstoreMasterform.value.Store_Key,
      "Store_Name":this.addstoreMasterform.value.Store_Name,
      "Store_City":this.addstoreMasterform.value.Store_City,
      "Store_Region":this.addstoreMasterform.value.Store_State,
      "Store_Country":this.addstoreMasterform.value.Store_Country,
      "Store_Latitude":this.addstoreMasterform.value.Store_Lattitude,
      "Store_Longitude":this.addstoreMasterform.value.Store_Longitude,
      // "Status":this.addstoreMasterform.value.Status
    }
    this.storeMasterService.addnewStores(obj).subscribe((response) => {
      console.log(response);
     
      this.router.navigateByUrl('/storemaster');

    })
  }

}
