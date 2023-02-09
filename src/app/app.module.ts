import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import {DatePipe} from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { DataTablesModule } from "angular-datatables";
import { ChartModule } from 'angular-highcharts';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { HighchartsChartModule } from 'highcharts-angular';
import { FusionChartsModule } from "angular-fusioncharts";
import { Daterangepicker } from 'ng2-daterangepicker';
// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { AgGridModule } from 'ag-grid-angular';
import { DashboardnewComponent } from './dashboardnew/dashboardnew.component';
import { LivedataComponent } from './livedata/livedata.component';
import { SupplytimeComponent } from './supplytime/supplytime.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { SensorDataComponent } from './sensor-data/sensor-data.component';
import { ReportsDatainsertComponent } from './reports-datainsert/reports-datainsert.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    DataTablesModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ChartModule,
    HighchartsChartModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    AgGridModule.withComponents([]),
    FusionChartsModule,
    Daterangepicker
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DashboardnewComponent,
    LivedataComponent,
    SupplytimeComponent,
    MenuListComponent,
    SensorDataComponent,
    ReportsDatainsertComponent,
    ReportsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
