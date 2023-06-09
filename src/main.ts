import { provideRouter } from '@angular/router';



import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import { APP_ROUTE } from './app/app.route';

import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';




bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTE),
    provideHttpClient(),
    provideToastr(),
    provideAnimations(),
    importProvidersFrom(BrowserAnimationsModule),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
]


});