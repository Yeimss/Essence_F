import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { NotesDto } from '../Models/Perfum/NotesDto';

@Injectable({
  providedIn: 'root'
})
export class PerfumsService {

  constructor(private http:HttpClient) { }
  getNotes(){
    return this.http.get<NotesDto>(`${environment.appUrl}api/notes/getNotes`)
  }
}
