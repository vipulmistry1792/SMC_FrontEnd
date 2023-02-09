import { Routes } from '@angular/router';
import { AuthGuard } from '../../_helpers';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { DashboardnewComponent } from '../../dashboardnew/dashboardnew.component';
import { LivedataComponent } from '../../livedata/livedata.component';
import { SupplytimeComponent } from '../../supplytime/supplytime.component';
import { MenuListComponent } from '../../menu-list/menu-list.component';
import { SensorDataComponent } from '../../sensor-data/sensor-data.component';
import { ReportsDatainsertComponent } from 'src/app/reports-datainsert/reports-datainsert.component';
import { ReportsComponent } from 'src/app/reports/reports.component';

export const AdminLayoutRoutes: Routes = [
    //{ path: 'dashboard',      component: DashboardnewComponent ,canActivate: [AuthGuard]},
    { path: 'Menu',           component: MenuListComponent,canActivate: [AuthGuard] },
    { path: 'livedata',      component: LivedataComponent ,canActivate: [AuthGuard]},
    { path: 'sensordata',      component: SensorDataComponent ,canActivate: [AuthGuard]},
    { path: 'supplytime',      component: SupplytimeComponent ,canActivate: [AuthGuard]},
    { path: 'reportdata',      component: ReportsDatainsertComponent ,canActivate: [AuthGuard]},
    { path: 'Reports',      component: ReportsComponent ,canActivate: [AuthGuard]},
    { path: 'user-profile',   component: UserProfileComponent ,canActivate: [AuthGuard]},
    { path: 'tables',         component: TablesComponent ,canActivate: [AuthGuard]},
    { path: 'icons',          component: IconsComponent,canActivate: [AuthGuard] },
    { path: 'maps',           component: MapsComponent,canActivate: [AuthGuard] }
];
