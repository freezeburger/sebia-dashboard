import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';

export const routes: Routes = [
    {
        title: 'Dashboard',
        path: 'dashboard',
        component: HomePage
    },
    {
        title: 'Review and Comment',
        path: 'review',
        loadComponent: () => import('../pages/review/review.page').then(m => m.ReviewPage)
    },
    {
        title:'List of Analysis',
        path: 'list',
        loadComponent: () => import('../pages/list/list.page').then(m => m.ListPage)
    },
    {
        title:'Analysis Validation',
        path: 'validation',
        loadComponent: () => import('../pages/validation/validation.page').then(m => m.ValidationPage)
    },
    {
        title:'Notifications',
        path: 'notifications',
        loadComponent: () => import('../pages/notifcation/notifcation.page').then(m => m.NotifcationPage)
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];
