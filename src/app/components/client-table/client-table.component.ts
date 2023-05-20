import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from 'src/app/services';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { client } from 'src/app/models';
import { CreateClientComponent } from '../create-client';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { SearchAdvancedComponent } from '../search-advanced/search-advanced.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [MatCardModule,MatIconModule, CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSortModule, MatDialogModule, MatDatepickerModule],
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {


  clientList: Array<client> = [];

  displayedColumns: string[] = ['sharedKey', 'businessID', 'email', 'phone', 'dataAdded', 'action'];
  dataSource!: MatTableDataSource<client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  @ViewChild(MatSort) sort!: MatSort;
 

  constructor(public dialog: MatDialog, private dataService: DataService) {

  }

  openCreateDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateClientComponent, {
      backdropClass: 'blurred',
      autoFocus: false,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openSearchDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SearchAdvancedComponent, {
      backdropClass: 'blurred',
      autoFocus: false,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  ngOnInit(): void {
    this.getData();
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    debugger;
    //this.dataSource.paginator = this.paginator;
  }

  getData() {
    debugger;
    this.dataService.getData().subscribe((result: any) => {
      debugger;
      this.clientList = result;

      this.dataSource = new MatTableDataSource(this.clientList);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (error: any) => {
        console.error('error service')
      }
    );
  }

  create() {
    debugger;
    this.dataService.getData().subscribe((result: any) => {
      debugger;
      this.clientList = result;

      this.dataSource = new MatTableDataSource(this.clientList);

      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

    },
      (error: any) => {
        console.error('error service')
      }
    );
  }

  saveData() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      showTitle: false,
      title: 'my_clients',
      useBom: false,
      noDownload: false,
      headers: ["sharedKey", "businessID", "email", "phone", "dataAdded"]
    };

    new ngxCsv(this.clientList, 'Clients', options);
  }

}
