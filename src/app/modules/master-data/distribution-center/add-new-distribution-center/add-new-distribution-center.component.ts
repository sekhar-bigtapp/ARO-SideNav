import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distributionCenterService } from '../distribution-center.service';


@Component({
  selector: 'app-add-new-distribution-center',
  templateUrl: './add-new-distribution-center.component.html',
  styleUrls: ['./add-new-distribution-center.component.css']
})
export class AddNewDistributionCenterComponent implements OnInit {

  addDCmasterForm!: FormGroup;

  validation_messages = {
    Distribution_Key: [
      { type: 'required', message: 'Please Enter Store Id' },
    ],
    Distribution_Name: [
      { type: 'required', message: 'Please Enter Store Name' },
    ],
    State_Name: [
      { type: 'required', message: 'Please Enter Store City' },
    ],
    Country_Name: [
      { type: 'required', message: 'Please Enter Store State' },
    ],
    City_Name: [
      { type: 'required', message: 'Please Enter Store Country' },
    ],
    Latitude: [
      { type: 'required', message: 'Please Enter Store Lattitude' },
    ],
    Longitude: [
      { type: 'required', message: 'Please Enter Store Longitude' },
    ],
    // Status: [
    //   { type: 'required', message: 'Please Enter Status' },
    // ],
    // Store_Key: [
    //   { type: 'required', message: 'Please Enter Status' },
    // ],
    // Distance: [
    //   { type: 'required', message: 'Please Enter Status' },
    // ],
    
    
    
  };

  constructor(private router: Router, private formBuilder:FormBuilder, private distributionCenterService:distributionCenterService  ){ }

  ngOnInit(): void {
    this.addDCmasterForm= this.formBuilder.group({
      Distribution_Key: ['',Validators.required],
      Distribution_Name: ['',Validators.required],
      State_Name: ['',Validators.required],
      Country_Name: ['',Validators.required],
      City_Name: ['',Validators.required],
      Latitude: ['',Validators.required],
      Longitude: ['',Validators.required],
      // Status: ['',Validators.required],
      // Store_Key:['',Validators.required],
      // Distance:['',Validators.required]
    })
  }

  onAddDCMasterSubmit(){
   
    console.log(this.addDCmasterForm.value);
    let obj = {
      "DC_ID":this.addDCmasterForm.value.Distribution_Key,
      "Name": this.addDCmasterForm.value.Distribution_Name,
      "DC_Region": this.addDCmasterForm.value.State_Name,
      "DC_Country": this.addDCmasterForm.value.Country_Name,
      "DC_City": this.addDCmasterForm.value.City_Name,
      "DC_Longitude": this.addDCmasterForm.value.Latitude,
      "DC_Latitude": this.addDCmasterForm.value.Longitude,
      // "Status": this.addDCmasterForm.value.Status,
      // "Store_Key": this.addDCmasterForm.value.Store_Key,
      // "Distance" : this.addDCmasterForm.value.Distance,
      
    }
    this.distributionCenterService.addNewDistribution(obj).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/distributionmaster')
     
    })

  }
}
