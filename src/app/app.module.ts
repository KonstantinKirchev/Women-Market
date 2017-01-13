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

import { AppComponent, 
         HomeComponent, 
         NavbarComponent, 
         LoginComponent,
         RegisterComponent,
         ProfileComponent 
        } from './index';

import { UsersService } from "./shared/services/users.service";
import { StoresComponent } from './stores/stores.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component'

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
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    CarouselModule
  ],
  providers: [appRoutingProviders, AuthService, AuthGuard, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
