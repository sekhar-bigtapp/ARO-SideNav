

import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})

export class forecastService extends BaseHttp{
    forecastUrl: string = "forecast";

    getStores(Obj: any){
        return this.post<any>(this.forecastUrl, Obj);
    }
}
