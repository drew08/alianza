import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { ClientTableComponent } from '../client-table';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [MatIconModule, RouterModule, HttpClientModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, CommonModule, MatButtonModule, ToastrModule, MatCardModule],
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  today = new Date();

  actionTitle: String = 'Create New Client';

  registrationForm = this.fb.group({
    businessID: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    dataAdded: [this.today, [Validators.required]],
    endDate: [, [Validators.required]],
    sharedKey: ['',]
  });

  constructor(private dataService: DataService,
    public fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<ClientTableComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any

  ) { }
  ngOnInit(): void {
    if (this.editData) {
      this.actionTitle = 'Update Client';
      this.registrationForm.controls['businessID'].setValue(this.editData.businessID);
      this.registrationForm.controls['phone'].setValue(this.editData.phone);
      this.registrationForm.controls['email'].setValue(this.editData.email);
      this.registrationForm.controls['dataAdded'].setValue(this.editData.dataAdded);
      this.registrationForm.controls['sharedKey'].setValue(this.editData.sharedKey);
      this.registrationForm.controls['endDate'].setValue(this.editData.endDate);
    }
  }

  onSubmit() {
    debugger;

    let data = this.registrationForm.value;
    this.generateSharedKey(data);

    if (!this.registrationForm.valid) {
      this.toastr.warning('please review the information entered.')
    } else {

      if (!this.editData) {
        this.createData(data);
      } else {
        this.updateData(data);
      }

    }
  }

  generateSharedKey(data: any) {
    debugger;
    if (data.businessID) {
      var parts = data.businessID.match(/^([a-zA-Z])[^\s]*(.*)$/);
      data.sharedKey = parts[1] + parts[2].replace(/\s/g, "");
    }
  }

  createData(data: any) {
    debugger;
    this.dataService.createData(data).subscribe((result: any) => {
      debugger;
      this.toastr.success('Successful registration.')
      this.registrationForm.reset({});
      var res = result;
      this.dialogRef.close('save');

    },
      (error: any) => {
        console.error('error create data component')
      }
    );
  }

  updateData(data: any) {
    debugger;

    this.dataService.updateData(this.editData._id, data).subscribe((result: any) => {
      debugger;
      this.toastr.success('update successful.')
      this.registrationForm.reset({});
      var res = result;
      this.dialogRef.close('update');

    },
      (error: any) => {
        console.error('error update component')
      }
    );
  }



}


