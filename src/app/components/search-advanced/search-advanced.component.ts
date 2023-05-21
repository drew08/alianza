import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatSelectModule } from '@angular/material/select';

import { MatButtonModule } from '@angular/material/button';

import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-search-advanced',
  standalone: true,
  imports: [MatIconModule, RouterModule, HttpClientModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, CommonModule, MatButtonModule, ToastrModule, MatCardModule],
  templateUrl: './search-advanced.component.html',
  styleUrls: ['./search-advanced.component.scss']
})
export class SearchAdvancedComponent  {

  today = new Date();

  registrationForm = this.fb.group({
    businessID: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    dataAdded: [this.today, [Validators.required]],
    endDate: ['', [Validators.required]],
    sharedKey: ['',]
  }); // moment(new Date()).format("DD/MM/YYYY")

  constructor(private dataService: DataService,
    public fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router

  ) { }


  

  onSubmit() {
    debugger;
    let data = this.registrationForm.value;
    if (!this.registrationForm.valid) {
      this.toastr.warning('por favor ingrese la informacion.')
    } else {
      this.advancedSearch(data);
    }
  }

 
  advancedSearch(data: any) {
    debugger;
    this.dataService.advancedSearch(data).subscribe((result: any) => {
      debugger;
      this.registrationForm.reset({});
      var res = result;
    },
      (error: any) => {
        console.error('error caught in component')
      }

    );
  }



}
