import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { client } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  baseURL: string = "http://localhost:3000/clients";


  constructor(private http: HttpClient) { }

  getData() {
    
    return this.http.get(`${this.baseURL}`);
  }


  getDataBySharedKey(sharedKey: string) {
    
    return this.http.get(`${this.baseURL}/findbysharedKey/${sharedKey}`);
  }


  createData(data: client) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data);
    return this.http.post(`${this.baseURL}`, body, { 'headers': headers });
  }


  advancedSearch(data: client) {
    // no implementado...
    return this.http.get(`${this.baseURL}/findbysharedKey/${data.sharedKey}`);
  }

  updateData(id: string, data: client) {
    
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data);
    return this.http.patch(`${this.baseURL}/${id}`, body, { 'headers': headers });
  }


  deleteData(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}


