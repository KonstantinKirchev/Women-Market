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
    AddProductComponent,
    ShoppingCartComponent,
    EditProductComponent
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
        children: [
            {
                path: 'all',
                component: ProductsComponent
            },
            {
                path: 'fruits',
                component: ProductsComponent
            },
            {
                path: 'vegetables',
                component: ProductsComponent
            },
            {
                path: 'dairy',
                component: ProductsComponent
            },
            {
                path: 'meats',
                component: ProductsComponent
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
        path:'shopping-cart',
        component: ShoppingCartComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'products/edit/:id',
        component: EditProductComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'**',
        redirectTo: ''
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);