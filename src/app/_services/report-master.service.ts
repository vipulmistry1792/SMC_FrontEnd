import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ReportMaster } from '../_models/report-master';

@Injectable({
  providedIn: 'root'
})
export class ReportMasterService {

  constructor(    
    private router: Router,
    private http: HttpClient
    ) { }
    getAllreports() {
      return this.http.get<any>(`${environment.apiUrl}/api/report/getreportdata`);
  }
  getreportsById (userparam): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/report/getreportbyid`,userparam);
  }
  getreportsBywdsId (userparam): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/report/getreportbywdsid`,userparam);
  }
 create_report (userparam): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/report/reportcreate`,userparam);
  }
  update_report (id,userparam): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/report/getreportbywdsid/${id}`,userparam);
  }
  report_data (userparam): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/report/getdata`,userparam);
  }
}
