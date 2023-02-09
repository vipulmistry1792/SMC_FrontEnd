import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TimeseriesService {
  constructor(private http: HttpClient) { }

  getwdsData (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/wds`,meterdata);
  }
  getsensorData (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/sensordata`,meterdata);
  }
  getESRData (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/esr`,meterdata);
  }
  getWTPData (meterdata): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/wtpdata`,meterdata);
  }
}
