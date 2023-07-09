import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HoursComponent } from './hours/hours.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

import { HttpClientModule } from '@angular/common/http';
import { TicketComponent } from './ticket/ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HoursComponent,
    VehiclesComponent,
    TicketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
