import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  constructor(        
    private router: Router,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
  }
live_dataclick()
{
  this.router.navigate(['/livedata']);
}
sensor_dataclick()
{
  this.router.navigate(['/sensordata']);
}
Reports_dataclick()
{
  this.router.navigate(['/Reports']);
}
}
