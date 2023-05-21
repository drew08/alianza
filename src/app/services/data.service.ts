import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  baseURL: string = "http://localhost:3000/clients";

  public search = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { }

  getData() {
    debugger;
    return this.http.get(`${this.baseURL}?sort=asc`);
  }


  getDataBySharedKey(sharedKey: string) {
    debugger;
    return this.http.get(`${this.baseURL}/findbysharedKey/${sharedKey}`);
  }


  createData(data: {}) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data);
    return this.http.post(`${this.baseURL}`, body, { 'headers': headers });
  }


  advancedSearch(data: {}) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data);
    return this.http.post(`${this.baseURL}`, body, { 'headers': headers });
  }

  updateData(id: string, data: {}) {
    debugger;
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data);
    return this.http.patch(`${this.baseURL}/${id}`, body, { 'headers': headers });
  }

  deleteData(id: number) {

    return this.http.delete(`${this.baseURL}/${id}`);
  }




}


