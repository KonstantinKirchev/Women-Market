import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "./shared/security/auth.guard";

import {
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    StoresComponent,
    ProductsComponent
} from './index';

const appRoutes: Routes= [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path:'stores',
        component: StoresComponent
    },
    {
        path:'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'products',
        component: ProductsComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'**',
        redirectTo: ''
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);