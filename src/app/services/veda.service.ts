import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Veda } from '../../app/models/veda.model';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VedaService {

    constructor(private httpClient: HttpClient) { }

    public getVeda(code: string): Observable<Veda> {
        return this.httpClient.get<Veda>("vedas/" + code);
    }

    public saveVeda(veda: Veda) {
        return this.httpClient.post("vedas", veda);
    }

    public updateVeda(veda: Veda) {
        return this.httpClient.put("vedas", veda);
    }

    public getVedaCounts(vedaCode: string): Observable<Veda> {
        const api = "veda-counts/" + vedaCode?.replace(".", "_");
        return this.httpClient.get<Veda>(api);
    }

}
