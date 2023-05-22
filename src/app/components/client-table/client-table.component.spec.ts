import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTableComponent } from './client-table.component';




import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { client } from 'src/app/models';
import { SearchAdvancedComponent } from '../search-advanced/search-advanced.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpTestingController, provideHttpClientTesting } 
    from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { APP_ROUTE } from 'src/app/app.route';
import { importProvidersFrom } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';



let mockedClient: Array<client> = [];

 mockedClient =  [
   {
    "_id": "abcd",
    "sharedKey": "abcd",
    "businessID": "abcd",
    "email": "abcd",
    "phone":"abcd",
    "dataAdded": "abcd"
 },
 {
  "_id": "abcdd",
  "sharedKey": "abcd",
  "businessID": "abcd",
  "email": "abcd",
  "phone":"abcd",
  "dataAdded": "abcd"
}
] 
 
 const mockedDataService: {
  getData: ()  =>  Observable<Object>;
 } = {
  getData: ()  => of(mockedClient),
 };

describe('ClientTableComponent', () => {
  let component: ClientTableComponent;
  let fixture: ComponentFixture<ClientTableComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ToastrModule.forRoot({
        positionClass :'toast-bottom-right'
      }),ClientTableComponent, HttpClientTestingModule, SearchAdvancedComponent, MatExpansionModule, MatCardModule, MatIconModule, CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSortModule, MatDialogModule, MatDatepickerModule],
      providers: [
        provideHttpClientTesting(),
        provideRouter(APP_ROUTE),
        provideToastr(),
        provideAnimations(),
        importProvidersFrom(BrowserAnimationsModule),
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }

      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('crear componente ClientTableComponent',() => {
    fixture = TestBed.createComponent(ClientTableComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });


   it('should call api, getData',() => {
     const getDataSpy = spyOn(mockedDataService,'getData');
     getDataSpy.and.returnValue(of(mockedClient));
     component.getData;
     expect(mockedDataService.getData).toHaveBeenCalled();
    // expect(component.clientList).toEqual(mockedClient);
     // sin servicio
    //  getDataSpy.and.returnValue(throwError(() =>'error en servidor'));
    //  component.clientList = [];
    //  expect(mockedDataService.getData).toHaveBeenCalled();
    //  expect(component.clientList).toBeFalsy();
   });

   it('should call service.getData', ()=>{

    const getDataSpy = spyOn(mockedDataService,'getData');
  
    component.getData();
  
    expect(getDataSpy).toHaveBeenCalled();
    
  });


 

});



