import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { APP_ROUTE } from 'src/app/app.route';
import { ClientTableComponent } from '../client-table';
import { SearchAdvancedComponent } from '../search-advanced/search-advanced.component';
import { CreateClientComponent } from './create-client.component';
import { MatDialog } from '@angular/material/dialog';

describe('CreateClientComponent', () => {
  let component: CreateClientComponent;
  let fixture: ComponentFixture<CreateClientComponent>;
  let dialogRef: MatDialogRef<ClientTableComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ToastrModule.forRoot({
        positionClass :'toast-bottom-right'
      }),MatDialogModule , ClientTableComponent, CreateClientComponent, ClientTableComponent, HttpClientTestingModule, SearchAdvancedComponent, MatExpansionModule, MatCardModule, MatIconModule, CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSortModule, MatDialogModule, MatDatepickerModule],
      providers: [
        {useValue: mockDialogRef},
        provideHttpClientTesting(),
        provideRouter(APP_ROUTE),
        provideToastr(),
        provideAnimations(),
        importProvidersFrom(BrowserAnimationsModule),
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CreateClientComponent', () => {
    expect(component).toBeTruthy();
  });
});
