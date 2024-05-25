import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { NotesDto } from '../Models/Perfum/NotesDto';
import { NoteTypeDto } from '../Models/Perfum/NoteTypeDto';
import { HouseDto } from '../Models/Perfum/OriginsDto';

@Injectable({
  providedIn: 'root'
})
export class PerfumsService {

  constructor(private http:HttpClient) { }
  getNotes(){
    return this.http.get<NotesDto>(`${environment.appUrl}api/notes/getNotes`)
  }
  getNoteTypes(){
    return this.http.get<NoteTypeDto>(`${environment.appUrl}api/notes/getNoteTypes`)
  }
  getOrigin(){
    return this.http.get<HouseDto>(`${environment.appUrl}api/notes/getOrigins`)
  }
  getConcentrations(){
    return this.http.get<HouseDto>(`${environment.appUrl}api/notes/getConcentrations`)
  }
  getGenders(){
    return this.http.get<HouseDto>(`${environment.appUrl}api/notes/getGenders`)
  }
  getSizes(){
    return this.http.get<HouseDto>(`${environment.appUrl}api/notes/getSizes`)
  }
}
