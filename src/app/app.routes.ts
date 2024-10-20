import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'Add-Contact',
        pathMatch:'full'
    },
    {
        path:'Add-Contact',
        component:DashboardComponent
    }
];
