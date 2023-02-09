import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MeterMasterService {

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }
    getAlltype() {
      return this.http.get<any>(`${environment.apiUrl}/api/master/type`);
  }
  getAllwds() {
    return this.http.get<any>(`${environment.apiUrl}/api/master/type`);
}
  getDGstatus (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/master/wds`,meterdata);
  }
  getwds (): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/master/wdsdata`);
  }
  getwdsById (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/master/wdsById`,meterdata);
  }
  updatesupplytime (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/master/supplytime`,meterdata);
  }
}
