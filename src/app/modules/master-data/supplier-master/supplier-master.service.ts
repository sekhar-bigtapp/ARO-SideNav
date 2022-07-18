import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})
export class supplerMasterService extends BaseHttp {
    supplerMasterUrl: string = "supplier-master";

    getStores(Obj: any) {
        return this.post<any>(this.supplerMasterUrl, Obj);
    }
}