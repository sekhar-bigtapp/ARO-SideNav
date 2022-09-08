import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  
 
  constructor(
    private router: Router, private formBuilder: FormBuilder, private storeMasterService: storeMasterService
  ) { }

  ngOnInit(): void {
    this.addstoreMasterform = this.formBuilder.group({
      Store_Key: [''],
      Store_Name: [''],
      Store_City: [''],
      Store_State: [''],
      Store_Country: [''],
      Store_Lattitude: [''],
      Store_Longitude: [''],
      Status: [''],
    });
  }
 
  onAddStoreMasterSubmit() {
    let obj = {
      "Store_Key":this.addstoreMasterform.value.Store_Key,
      "Store_Name":this.addstoreMasterform.value.Store_Name,
      "Store_City":this.addstoreMasterform.value.Store_City,
      "Store_State":this.addstoreMasterform.value.Store_State,
      "Store_Country":this.addstoreMasterform.value.Store_Country,
      "Store_Lattitude":this.addstoreMasterform.value.Store_Lattitude,
      "Store_Longitude":this.addstoreMasterform.value.Store_Longitude,
      "Status":this.addstoreMasterform.value.Status
    }
    this.storeMasterService.addnewStores(obj).subscribe((response) => {
      console.log(response);
      
     
    })
  }

}
