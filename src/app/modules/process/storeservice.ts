import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends BaseHttp {
  searchStoreUrl: string = 'search-store';
  updateQtyUrl: string = 'update-quantity';
  StoreNamesUrl: string = "store-names";

  searchStores(data: any) {
    return this.post<any>(this.searchStoreUrl, data);
  }

  saveProduct(prod: any) {
    return this.post<any>(this.updateQtyUrl, prod);
  }

  getStoreNames() {
    return this.get<any>(this.StoreNamesUrl);
  }
}
