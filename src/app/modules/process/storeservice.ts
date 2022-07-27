import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends BaseHttp {
  searchStoreUrl: string = 'search-store';
  updateQtyUrl: string = 'update-quantity';
  StoreNamesUrl: string = "store-names";
  CategoryNameUrl:string ="categories";
  ProductNameUrl:string = "product-names";
  SubCategoryNameurl:string = "subcategories"
  updatedBlanketUrl : string = "update-blanketquantity"

  searchStores(data: any) {
    return this.post<any>(this.searchStoreUrl, data);
  }

  saveProduct(prod: any) {
    return this.post<any>(this.updateQtyUrl, prod);
  }

  getStoreNames() {
    return this.get<any>(this.StoreNamesUrl);
  }
  getCategoryNames() {
    return this.get<any>(this.CategoryNameUrl);
  }
  getSubCategoryNames(sub:any){
    return this.post<any>(this.SubCategoryNameurl, sub);
  }
  getProductNames(){
    return this.get<any>(this.ProductNameUrl)
  }
  getBlanketQty(update:any){
    return this.post<any>(this.updatedBlanketUrl, update)
  }
}
