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
import { MeterMasterService,TimeseriesService} from '../_services';

@Component({
  selector: 'app-supplytime',
  templateUrl: './supplytime.component.html',
  styleUrls: ['./supplytime.component.scss']
})
export class SupplytimeComponent implements OnInit {
  dateValue                         = new Date();
  dateValue1                        = new Date();
  subscription: Subscription;
  typeid=1;
  public type_data
  public BatchData
  public wds_data
  public wdsprefix=""
  public id
  public running_data;
  public ESR_DATA;
  public WDS_DATA;
  public INTAKE_DATA;
  public BOOSTER_DATA;
  public WTP_DATA;
  public loader=false;
  public Header='';
  public SupplyTime=[];
  public SupplyTime1='';
  public SupplyTime2='';
  public SupplyTime3='';
 constructor(private datepipe: DatePipe,private MeterMasterService:MeterMasterService,private TimeseriesService:TimeseriesService) { }
 ngOnInit(): void {
  this.getTypeData();
  this.getwds();
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
getwds()
{
  this.MeterMasterService.getwds()
  .pipe(first())
  .subscribe(mqttda => {
    this.BatchData=mqttda;
  })

}
UpdateData(){
  const data_wds = {
    id                      :  this.id,
    SupplyTime1             : this.SupplyTime1,
    SupplyTime2             : this.SupplyTime2,
    SupplyTime3             : this.SupplyTime3
  };
  this.MeterMasterService.updatesupplytime(data_wds)
    .subscribe(
      response => {
        this.SupplyTime1='';
        this.SupplyTime2='';
        this.SupplyTime3='';
        this.getwds();
        this.id=0;
      },
      error => {
      });
}
Edit($event:any,id)
{
  const data_wds = {
    id             : id
  };
  console.log(data_wds)
  this.MeterMasterService.getwdsById(data_wds)
    .subscribe(
      machinedata => {
      this.SupplyTime=machinedata;
       this.typeid         = machinedata[0].type_id;
       this.id             = machinedata[0].id;
       this.SupplyTime1    = machinedata[0].SupplyTime1;
       this.SupplyTime2    = machinedata[0].SupplyTime1,
       this.SupplyTime3    = machinedata[0].SupplyTime1
      },
      error => {
        console.log(error);
      });   
}
}
