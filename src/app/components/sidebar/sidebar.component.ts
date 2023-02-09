import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../_services';
import { User } from '../../_models';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/Menu', title: 'Home',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/livedata', title: 'live data',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/sensordata', title: 'Sensor Data',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/reportdata', title: 'Report Master',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/Reports', title: 'Reports',  icon: 'ni-tv-2 text-primary', class: '' },
];
export const ROUTES1: RouteInfo[] = [
  { path: '/Menu', title: 'Home',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/livedata', title: 'live data',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/supplytime', title: 'SupplyTime',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/sensordata', title: 'Sensor Data',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/Reports', title: 'Reports',  icon: 'ni-tv-2 text-primary', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public focus;
  public listTitles: any[];
  user: User;
  constructor(private router: Router,private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit() {
  if(this.user['user_control']==1)
  {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  else if(this.user['user_control']==0)
  {
    this.menuItems = ROUTES1.filter(menuItem => menuItem);
  }    
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  logout() {
    this.accountService.logout();
}
}
