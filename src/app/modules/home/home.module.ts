import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ClientTableComponent } from 'src/app/components/client-table';
import { CreateClientComponent } from 'src/app/components/create-client';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClientTableComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    CreateClientComponent
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [

  ]

})
export class HomeModule { }
