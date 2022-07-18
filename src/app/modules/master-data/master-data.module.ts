import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { MatTableModule } from '@angular/material/table';
import { ProductMasterComponent } from './product-master/product-master.component';
import { StoreMasterComponent } from './store-master/store-master.component';
import { StoreSupplierMasterComponent } from './store-supplier-master/store-supplier-master.component';
import { SupplierMasterComponent } from './supplier-master/supplier-master.component';
import { DistributionCenterComponent } from './distribution-center/distribution-center.component';
import { MasterDataComponent } from './master-data.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MasterDataComponent,
    SupplierMasterComponent,
    StoreSupplierMasterComponent,
    StoreMasterComponent,
    ProductMasterComponent,
    DistributionCenterComponent
  ],
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MasterDataModule { }
