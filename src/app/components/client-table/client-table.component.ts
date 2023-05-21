import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { client } from 'src/app/models';
import { DataService } from 'src/app/services';
import { CreateClientComponent } from '../create-client';
import { SearchAdvancedComponent } from '../search-advanced/search-advanced.component';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [SearchAdvancedComponent, MatExpansionModule, MatCardModule, MatIconModule, CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSortModule, MatDialogModule, MatDatepickerModule],
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
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getData();
      }
    });;
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

  updateDialog(row: any,enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(CreateClientComponent, {
      backdropClass: 'blurred',
      autoFocus: false,
      enterAnimationDuration,
      exitAnimationDuration,
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getData();
      }
    });

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
