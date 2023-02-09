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
  selector: 'app-livedata',
  templateUrl: './livedata.component.html',
  styleUrls: ['./livedata.component.scss']
})
export class LivedataComponent implements OnInit {
  dateValue                         = new Date();
  dateValue1                        = new Date();
  subscription: Subscription;
  typeid=0;
  public type_data
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
  this.getTypeData()
   this.showData();
   this.id = setInterval(this.showData, 5000);
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
showData()
{
  this.SupplyTime=[];
  document.getElementById('loading')
  .style.display = 'spinner-border';
  console.log(this.wdsprefix)
    const updatedList=this.wds_data.filter((curElemt)=>{
      
        return curElemt.tag_prefix===this.wdsprefix;
    });
    const updatedList1=this.wds_data.filter((curElemt)=>{
      if(curElemt.tag_prefix===this.wdsprefix)
      {
        if(curElemt.type_id==1)
        {
          return this.Header=`${curElemt.name}`;
        }
        else if(curElemt.type_id==2)
        {
          return this.Header=`WTP ${curElemt.name}`;
        }
        else if(curElemt.type_id==3)
        {
          return this.Header=`${curElemt.name}`;
        }
        else if(curElemt.type_id==4)
        {
          // if(curElemt.tag_prefix===this.wdsprefix)
          // {            
          //  this.SupplyTime1=curElemt.SupplyTime1;
          //  this.SupplyTime2=curElemt.SupplyTime2;
          //  this.SupplyTime3=curElemt.SupplyTime3;
          //  this.SupplyTime.push(this.SupplyTime1)
          //  this.SupplyTime.push(this.SupplyTime2)
          //  this.SupplyTime.push(this.SupplyTime3)
          // }
          return this.Header=`WDS ${curElemt.name}`;
        } 
        else if(curElemt.type_id==5)
        {
          return this.Header=`ESR ${curElemt.name}`;
        }
        else if(curElemt.type_id==6)
        {
          return this.Header=`FRENCHWELL ${curElemt.name}`;
        } 
        else{
          return this.Header=`${curElemt.name}`;
        }      
      }
      
  });
    this.loader=true;
   // console.log(updatedList[0])
    if(updatedList[0].type_id==4)
    {
      console.log(updatedList)
      this.TimeseriesService.getwdsData(updatedList[0])
      .pipe(first())
      .subscribe(mqttda => {
              this.WDS_DATA = mqttda[0];
             // this.WDS_DATA = [...this.WDS_DATA, this.SupplyTime]
             // console.log(this.WDS_DATA)
              this.loader=false;
      });
    }
    if(updatedList[0].type_id==1)
    {
      this.TimeseriesService.getwdsData(updatedList[0])
      .pipe(first())
      .subscribe(mqttda => {
              this.WDS_DATA = mqttda[0];
              //console.log(this.WDS_DATA)
              this.loader=false;
      });
    }
    if(updatedList[0].type_id==3)
    {
      this.TimeseriesService.getwdsData(updatedList[0])
      .pipe(first())
      .subscribe(mqttda => {
              this.WDS_DATA = mqttda[0];
             // console.log(this.WDS_DATA)
              this.loader=false;
      });
    }
    else if(updatedList[0].type_id==6){
      this.TimeseriesService.getwdsData(updatedList[0])
      .pipe(first())
      .subscribe(mqttda => {
        this.WDS_DATA = mqttda[0];
             // console.log(this.ESR_DATA)
              this.loader=false;
      });
    }
    else if(updatedList[0].type_id==5){
      this.TimeseriesService.getESRData(updatedList[0])
      .pipe(first())
      .subscribe(mqttda => {
              this.ESR_DATA = mqttda[0];
             // console.log(this.ESR_DATA)
              this.loader=false;
      });
    }
    else if(updatedList[0].type_id==2){
      this.TimeseriesService.getWTPData(updatedList[0])
      .pipe(first())
      .subscribe(mqttda => {
              this.WTP_DATA = mqttda[0];
              this.loader=false;
      });
    }
    else{

    }
}

unit(key)
{
let unit_type='';

if(key=="Level")
{
  unit_type="ft.";
}
else if(key=="InletFlow")
{
  unit_type="m3/hr";
}
else if(key=="InletFlow Today")
{
  unit_type="mld";
}
else if(key=="InletFlow Yesterday")
{
  unit_type="mld";
}
else if(key=="InletFlowTotal")
{
  unit_type="m3";
}
else if(key=="MovPOS")
{
  unit_type="%";
}
else{

}
return unit_type
}
unit_wds(key)
{
let unit_type='';

if(key=="UGT Level")
{
  unit_type="ft.";
}
else if(key=="Distribution Flow")
{
  unit_type="m3/hr";
}
else if(key=="Distribution Flow Total")
{
  unit_type="m3";
}
else if(key=="Distribution Pressure")
{
  unit_type="bar";
}
else if(key=="Outlet Pressure")
{
  unit_type="bar";
}
else if(key=="FT INLET")
{
  unit_type="m3/hr";
}
else if(key=="FT INLET TOTAL")
{
  unit_type="m3";
}
else if(key=="FT OUTLET")
{
  unit_type="m3/hr";
}
else if(key=="FT OUTLET TOTAL")
{
  unit_type="m3";
}
else if(key=="FT TRANSMISSION")
{
  unit_type="m3/hr";
}
else if(key=="FT TRANSMISSION TOTAL")
{
  unit_type="m3";
}
else if(key=="TRANSMISSION Pressure")
{
  unit_type="bar";
}
else if(key=="UGT Level")
{
  unit_type="ft.";
}
else if(key=="UGT Peak Level")
{
  unit_type="ft.";
}
else if(key=="Chlorine Transmitter")
{
  unit_type="PPM";
}
else if(key=="Chlorine Leak Detector")
{
  unit_type="PPM";
}
else if(key=="FRC Analyzer")
{
  unit_type="mg/ltr";
}
else if(key=="FRC Average")
{
  unit_type="mg/ltr";
}
else if(key=="Turbidity Analyzer")
{
  unit_type="NTU";
}
else if(key=="Turbidity Average")
{
  unit_type="NTU";
}
else if(key=="UGT Level")
{
  unit_type="ft.";
}
else if(key=="UGT PEAK LEVEL")
{
  unit_type="ft.";
}

else{
  var re = /FT/;
  var re4 = /Total/;
  var re3 = /Flow/;
  var re2 = /TOTAL/;
  var re1 = /Pressure/;
  if(key.search(re) != -1)
  {
    unit_type="m3/hr";
  }
  else if(key.search(re1) != -1)
  {
    unit_type="bar";
  }
  else if(key.search(re3) != -1)
  {
    unit_type="m3/hr";
  }
  else if(key.search(re2) != -1)
  {
    unit_type="m3";
  }
  else if(key.search(re4) != -1)
  {
    unit_type="m3";
  }
  else{

  }
}
return unit_type
}
unit_wtp(key)
{
let unit_type='';

if(key=="UGT Level")
{
  unit_type="ft.";
}
else if(key=="Distribution Flow")
{
  unit_type="m3/hr";
}
else if(key=="Distribution Flow Total")
{
  unit_type="m3";
}
else if(key=="Distribution Pressure")
{
  unit_type="bar";
}
else if(key=="Outlet Pressure")
{
  unit_type="bar";
}
else if(key=="FT INLET")
{
  unit_type="m3/hr";
}
else if(key=="FT INLET TOTAL")
{
  unit_type="m3";
}
else if(key=="FT OUTLET")
{
  unit_type="m3/hr";
}
else if(key=="FT OUTLET TOTAL")
{
  unit_type="m3";
}
else if(key=="FT TRANSMISSION")
{
  unit_type="m3/hr";
}
else if(key=="FT TRANSMISSION TOTAL")
{
  unit_type="m3";
}
else if(key=="TRANSMISSION Pressure")
{
  unit_type="bar";
}
else if(key=="UGT Level")
{
  unit_type="ft.";
}
else if(key=="UGT Peak Level")
{
  unit_type="ft.";
}
else if(key=="Chlorine Transmitter")
{
  unit_type="PPM";
}
else if(key=="Chlorine Leak Detector")
{
  unit_type="PPM";
}
else if(key=="FRC Analyzer")
{
  unit_type="mg/ltr";
}
else if(key=="FRC Average")
{
  unit_type="mg/ltr";
}
else if(key=="Turbidity Analyzer")
{
  unit_type="NTU";
}
else if(key=="Turbidity Average")
{
  unit_type="NTU";
}
else if(key=="UGT Level")
{
  unit_type="ft.";
}
else if(key=="UGT PEAK LEVEL")
{
  unit_type="ft.";
}
else if(key=="WELL Level")
{
  unit_type="ft.";
}
else if(key=="WELL PEAK LEVEL")
{
  unit_type="ft.";
}
else{
  var re = /Flow/;
  var re2 = /Level/;
  var re1 = /Pressure/;
  if(key.search(re) != -1)
  {
    unit_type="m3/hr";
  }
  else if(key.search(re1) != -1)
  {
    unit_type="bar";
  }
  else if(key.search(re2) != -1)
  {
    unit_type="mtr";
  }
  else{

  }
}
return unit_type
}
getwds_value(key,value )
{
  let wds_value;
  var re = /PUMP/;
  var re1 = /SupplyTime/;
  var re2 = /MOV/;
  console.log(key)
  console.log(this.wdsprefix)
 // let wds_pump=
  //console.log(wds_pump)
  if(key.search(re) != -1)
  {
    if(this.wdsprefix=="VALAK_F2_" || this.wdsprefix=="VALAK_F1_")
    {
      if(value==2)
      {
        wds_value="ON"
      }
      else if(value==1)
      {
        wds_value="OFF"
      }
      else if(value==0)
      {
        wds_value="ON"
      }
      else if(value==4)
      {
        wds_value="Trip"
      }
      else if(value==8)
      {
        wds_value="Starting"
      }
      else if(value==16)
      {
        wds_value="Stoping"
      }
      else if(value==32)
      {
        wds_value="No Permission"
      } 

    }
    else if(this.wdsprefix=="KOSAD_RAJWADI")
    {
      if(value==2)
      {
        wds_value="ON"
      }
      else if(value==1)
      {
        wds_value="ON"
      }
      else if(value==0)
      {
        wds_value="OFF"
      }
      else if(value==4)
      {
        wds_value="Trip"
      }
      else if(value==8)
      {
        wds_value="Starting"
      }
      else if(value==16)
      {
        wds_value="Stoping"
      }
      else if(value==32)
      {
        wds_value="No Permission"
      }      
    }
    else{
      if(value==2)
      {
        wds_value="ON"
      }
      else if(value==1)
      {
        wds_value="OFF"
      }
      else if(value==0)
      {
        wds_value="Error Reading Value"
      }
      else if(value==4)
      {
        wds_value="Trip"
      }
      else if(value==8)
      {
        wds_value="Starting"
      }
      else if(value==16)
      {
        wds_value="Stoping"
      }
      else if(value==32)
      {
        wds_value="No Permission"
      }      
    }

  }
  else{
    if(value !=null)
    {
      if(key.search(re1) != -1)
      {
        if(value<0){
          wds_value=0.00;
        }else{
        wds_value=value;
      }
      }
      else{
        if(key.search(re2) != -1)
        {
          
          if(value==2)
          {
            wds_value="ON"
          }
          else if(value==1)
          {
            wds_value="OFF"
          }
          else if(value==0)
          {
            wds_value="Error Reading Value"
          }
          else if(value==4)
          {
            wds_value="Trip"
          }
          else if(value==8)
          {
            wds_value="Starting"
          }
          else if(value==16)
          {
            wds_value="Stoping"
          }
          else if(value==32)
          {
            wds_value="No Permission"
          }
        }
        wds_value=value.toFixed(2);
      }
      
    }
    else{
      wds_value=0.00;
    }

  }
  return wds_value
}
getwtp_value(key,value )
{
  let wds_value;
  var re = /PUMP/;
  var re1 = /SupplyTime/;
  var re2 = /MOV/;
  if(key.search(re) != -1)
  {
    if(value==2)
    {
      wds_value="ON"
    }
    else if(value==1)
    {
      wds_value="OFF"
    }
    else if(value==0)
    {
      wds_value="Error Reading Value"
    }
    else if(value==4)
    {
      wds_value="Trip"
    }
    else if(value==8)
    {
      wds_value="Starting"
    }
    else if(value==16)
    {
      wds_value="Stoping"
    }
    else if(value==32)
    {
      wds_value="No permisson"
    }
  }
  else{
    if(value !=null)
    {
      if(key.search(re1) != -1)
      {
        wds_value=value;
      }
      else{
        if(value<0){
          wds_value=0.00;
        }else{
        wds_value=value.toFixed(2);
      }
        //wds_value=
      }      
    }
    else{
      wds_value=0.00;
    }

  }
  return wds_value
}
getesr_value(key,value )
{
  let wds_value;
  var re = /MOV Status/;
  var re1 = /SupplyTime/;
 // let wds_pump=
  //console.log(wds_pump)
  if(key.search(re) != -1)
  {
    if(value==2)
    {
      wds_value="ON"
    }
    else if(value==1)
    {
      wds_value="OFF"
    }
    else if(value==0)
    {
      wds_value="Error Reading Value"
    }
    else if(value==4)
    {
      wds_value="Trip"
    }
    else if(value==8)
    {
      wds_value="Starting"
    }
    else if(value==16)
    {
      wds_value="Stoping"
    }
    else if(value==32)
    {
      wds_value="Fault"
    }
  }
  else{
    if(value !=null)
    {
      if(value<0){
        wds_value=0.00;
      }else{
      wds_value=value.toFixed(2);
    }      
        //wds_value=value.toFixed(2);      
    }
    else{
      wds_value=0;
    }

  }
  return wds_value
}

ngOnDestroy() {
  clearInterval(this.id);
}

}
