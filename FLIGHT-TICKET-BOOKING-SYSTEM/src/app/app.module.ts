import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth Guard/Login-componnets/login/login.component';
import { SignUpComponent } from './Auth Guard/Login-componnets/sign-up/sign-up.component';
import { SearchFlightComponent } from './Module/Flight_Components/search-flight/search-flight.component';
import { FlightSearchService } from './Module/Flight_Services/flight-search.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayFlightDetailsComponent } from './Module/Flight_Components/display-flight-details/display-flight-details.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailsComponent } from './Module/Flight_Components/customer-details/customer-details.component';
import { AboutFlightComponent } from './Module/Flight_Components/about-flight/about-flight.component';
import { AuthInterceptorInterceptor } from './Interceptor/auth-interceptor.interceptor';
import { HeaderComponent } from './Layouts/header/header.component';



const routes: Routes = [
  { path: '', redirectTo: '/about-flight', pathMatch: 'full' },
  { path: 'about-flight', component: AboutFlightComponent },
  { path: 'search-flight', component: SearchFlightComponent },
  { path: 'display-flight-details', component: DisplayFlightDetailsComponent },
  { path: 'customer-details', component: CustomerDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },

 
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SearchFlightComponent,
    DisplayFlightDetailsComponent,
    CustomerDetailsComponent,
    HeaderComponent,
    AboutFlightComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorInterceptor,
    multi: true,
  }],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
