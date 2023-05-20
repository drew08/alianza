
import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { DataService, SideNavService } from 'src/app/services';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatToolbarModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {



  public totalCount: number = 0;
  public searchTerm: string = '';
  isMenuVisible = true;
  constructor(private dataService: DataService, private route: Router, private sideNavService: SideNavService) { }

  clickMenu() {
    this.sideNavService.toggle();
  }

  ngDoCheck(): void {
    let currentroute = this.route.url;
    if (currentroute == '/home' || currentroute == "/") {
      this.isMenuVisible = true
    } else {
      this.isMenuVisible = false
    }
  }

  ngOnInit(): void {


  }



  search(event: any) {

    this.searchTerm = (event.target as HTMLInputElement).value;
    this.dataService.search.next(this.searchTerm);

  }

}
