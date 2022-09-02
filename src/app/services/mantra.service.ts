import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mantra } from '../../app/models/mantra.model';
import { VedaSearchInput } from '../models/veda.model';
import { Observable } from 'rxjs';
import { PagedResult } from '../models/shared.models';
import { SearchInVedasInput } from '../models/search.models';

@Injectable({
  providedIn: 'root'
})
export class MantraService {

  constructor(private httpClient: HttpClient) { }

  public getMantra(code: string): Observable<Mantra> {
    if (code) {
      code = code?.split(".").join("_")
      return this.httpClient.get<Mantra>("mantras/" + code);
    }
    //R.01.00059
  }

  public getVedaMantras(input: VedaSearchInput): Observable<PagedResult<Mantra>> {
    return this.httpClient.post<PagedResult<Mantra>>("veda-mantras", input);
  }

  public createMantra(mantra: Mantra) {
    return this.httpClient.post("mantras", mantra);
  }

  public updateMantra(mantra: Mantra) {
    return this.httpClient.put("mantras", mantra);
  }

  public searchVedaMantras(input: SearchInVedasInput): Observable<PagedResult<Mantra>> {
    return this.httpClient.post<PagedResult<Mantra>>("search-veda-mantras", input);
  }
}
