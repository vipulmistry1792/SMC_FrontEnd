import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Chart } from 'angular-highcharts';
import { Color} from 'highcharts';
import { timer, Subject, range, of, Subscription, } from 'rxjs';
import { first } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);

import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
import { MeterMasterService,TimeseriesService,ReportMasterService} from '../_services';


@Component({
  selector: 'app-reports-datainsert',
  templateUrl: './reports-datainsert.component.html',
  styleUrls: ['./reports-datainsert.component.scss']
})
export class ReportsDatainsertComponent implements OnInit {

  dateValue                         = new Date();
  dateValue1                        = new Date();
  subscription: Subscription;
  typeid=0;
  public type_data
  public wds_data
  public wdsprefix=""
  public reportname=""
  public reporttable=""
  public reportheader=""
  public reportquery=""
  public reportquery1=""
  public id=0;
  public running_data;
  public ESR_DATA;
  public WDS_DATA;
  public INTAKE_DATA;
  public BOOSTER_DATA;
  public WTP_DATA;
  public loader=false;
  public Header='';
  public SupplyTime=[];
  public getAllReports=[];
  public getWDSReports=[];
  public SupplyTime1='';
  public SupplyTime2='';
  public SupplyTime3='';
 constructor(private datepipe: DatePipe,private ReportMasterService:ReportMasterService,private MeterMasterService:MeterMasterService,private TimeseriesService:TimeseriesService) { }
 ngOnInit(): void {
  this.getTypeData();
  this.getallReports();
   //this.showData();
   //this.id = setInterval(this.showData, 5000);
}
getTypeData()
{
  this.type_data=[];
  this.MeterMasterService.getAlltype()
  .pipe(first())
  .subscribe(mqttda => {
    this.type_data=mqttda;
  })

}
getwdsData(typeid)
{
  this.wds_data=[];
  const data={
    type_id:typeid,
  }
  this.MeterMasterService.getDGstatus(data)
  .pipe(first())
  .subscribe(mqttda => {
    this.wds_data=mqttda;
  })

}
getallReports()
{
  this.getAllReports=[];
  this.ReportMasterService.getAllreports()
  .pipe(first())
  .subscribe(mqttda => {
    this.getAllReports=mqttda;
    console.log(this.getAllReports)
  })

}
getReportsbyWDS()
{
  this.getAllReports=[];
  const updatedList=this.wds_data.filter((curElemt)=>{      
    return curElemt.tag_prefix===this.wdsprefix;
});
  this.ReportMasterService.getreportsBywdsId(updatedList[0])
  .pipe(first())
  .subscribe(mqttda => {
    this.getAllReports=mqttda;
  })

}
getReportsbyIDS()
{
  this.getAllReports=[];
const repoortData={
  id:this.id
}
  this.ReportMasterService.getreportsBywdsId(repoortData)
  .pipe(first())
  .subscribe(mqttda => {
    this.getAllReports=mqttda;
  })

}
showData()
{
  this.SupplyTime=[];
  document.getElementById('loading')
  .style.display = 'spinner-border';
   
}
AddData()
{
  const updatedList=this.wds_data.filter((curElemt)=>{      
    return curElemt.tag_prefix===this.wdsprefix;
});
const wds_id=updatedList[0].id;
  const Data_Insert={
    wds_id:wds_id,
     ReportName:this.reportname,
     ReportTable:this.reporttable,
     ReportHeader:this.reportheader,
     ReportQuery:this.reportquery,
     ReportQuery1:this.reportquery1
  }
  this.ReportMasterService.create_report(Data_Insert)
  .pipe(first())
  .subscribe(mqttda => {
    this.reportname=""
    this.reporttable=""
    this.reportheader=""
    this.reportquery=""
    this.reportquery1=""
    this.getallReports()
  })
}
UpdateData()
{

}
Edit(data,id)
{ 
  console.log(id)
  const Data_Insert={
      id :id
  }
  this.ReportMasterService.getreportsById(Data_Insert)
  .pipe(first())
  .subscribe(mqttda => {
    this.reportname=mqttda.ReportName
    this.reporttable=mqttda.ReportTable
    this.reportheader=mqttda.ReportHeader
    this.reportquery=mqttda.ReportQuery
    this.reportquery1=mqttda.ReportQuery1
    const updatedList=this.wds_data.filter((curElemt)=>{      
      return curElemt.id===mqttda.wds_id;
  });
  this.typeid=updatedList[0].type_id;
  this.wdsprefix=updatedList[0].tag_prefix;
  
  })
}


ngOnDestroy() {
 
}

}
