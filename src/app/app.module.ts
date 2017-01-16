import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { firebaseConfig, authConfig } from "../environments/firebase.config";
import { AuthService } from "./shared/security/auth.service";
import { AuthGuard } from "./shared/security/auth.guard";
import { AngularFireModule } from "angularfire2/index";

import { CarouselModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/modal';

import { AppComponent, HomeComponent, NavbarComponent, LoginComponent, RegisterComponent, ProfileComponent,
         StoresComponent, FooterComponent, CategoriesComponent, ProductsComponent, EditProfileComponent,
         AddStoreComponent, AddProductComponent, StoreModalComponent  
        } from './index';

import { UsersService } from "./shared/services/users.service";
import { StoresService } from "./shared/services/stores.service";
import { ProductsService } from "./shared/services/products.service";

import { CategoryFilterPipe } from "./shared/pipes/category-filter.pipe"
import { ProductFilterPipe } from "./shared/pipes/product-filter.pipe"


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    StoresComponent,
    FooterComponent,
    CategoriesComponent,
    ProductsComponent,
    EditProfileComponent,
    AddStoreComponent,
    AddProductComponent,
    StoreModalComponent,
    CategoryFilterPipe,
    ProductFilterPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    CarouselModule,
    ModalModule
  ],
  providers: [appRoutingProviders, AuthService, AuthGuard, UsersService, StoresService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
