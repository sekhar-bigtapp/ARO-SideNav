import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})
export class distributionCenterService extends BaseHttp {
    distributionCenterUrl: string = "distribution-center";

    getDistributionCenters(Obj: any) {
        return this.post<any>(this.distributionCenterUrl, Obj);
    }
}