import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class PhysicalStockCheckService {
    envurl: string = 'http://54.179.68.250:4545/';
    physicalStockCheckUrl: string = 'Physical_stock';

    constructor(private httpClient: HttpClient) { }

    getPhysicalStockCheck(data: any) {
        const header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.post(this.envurl + this.physicalStockCheckUrl, JSON.stringify(data), { headers: header }).
            pipe(
                map((data: any) => {
                    return data;
                }), catchError(error => {
                    console.log(error)
                    return throwError(() => new Error('Something went wrong!'));
                })
            )
    }
}