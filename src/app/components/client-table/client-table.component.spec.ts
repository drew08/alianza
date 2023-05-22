import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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
import { BehaviorSubject, Observable, delay, of, throwError } from 'rxjs';
import { client } from 'src/app/models';
import { SearchAdvancedComponent } from '../search-advanced/search-advanced.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { APP_ROUTE } from 'src/app/app.route';
import { importProvidersFrom } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DataService } from 'src/app/services';



let client: Array<any> = [];

const mockedClient = 
[{
  "_id":"646ad48fa64de634ae7091dd",
  "sharedKey":"orodriguez",
  "businessID":"oscar rodriguez",
  "email":"os@gmail.com",
  "phone":"6666666666",
  "dataAdded":"2023-05-22T02:33:28.892Z",
  "endDate":"2023-05-23T05:00:00.000Z",
  "__v":0
}] 

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



  it('should test number of elements', ()=> {

    // given
    const restService = TestBed.inject(DataService);
    spyOn(restService, 'getData').and.returnValue(of(mockedClient));

    // when
    component.getData();

    // then
    expect(component.clientList.length).toBe(1);
  });

   it('should call service.getData', fakeAsync(()=>{

    let fixture = TestBed.createComponent(ClientTableComponent);
    let component = fixture.debugElement.componentInstance;
    let appService = fixture.debugElement.injector.get(DataService);
    let stub = spyOn(appService, "getData").and.callFake(()=>{
      return of([]).pipe(delay(300));
    })
    component.getData();
    //expect(component.showL).toEqual([]);
    tick(300);
    expect(component.clientList).toEqual([]);
    
  }));


 

});



