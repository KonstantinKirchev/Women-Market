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
    ProductsComponent,
    EditProfileComponent,
    AddStoreComponent,
    AddProductComponent
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
        canActivate: [AuthGuard],
        children: [
            {
                path: 'edit',
                component: EditProfileComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path:'products',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'all',
                component: ProductsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'fruits',
                component: ProductsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'vegetables',
                component: ProductsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'dairy',
                component: ProductsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'meats',
                component: ProductsComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path:'admin',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'add/store',
                component: AddStoreComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'add/product',
                component: AddProductComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path:'**',
        redirectTo: ''
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);