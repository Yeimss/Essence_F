import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http:HttpClient) { }
  getPerfums(){
    return this.http.get(`${environment.appUrl}api/Perfum/getAllPerfums`)
  }
}
