import { Component, OnInit } from '@angular/core';
import { PerfumsService } from '../../services/perfums.service';
import { error } from 'console';

@Component({
  selector: 'app-perfums',
  templateUrl: './perfums.component.html',
  styleUrl: './perfums.component.css'
})
export class PerfumsComponent implements OnInit {
  constructor(public perfumService:PerfumsService){}
  public notes:any = []
  ngOnInit(): void {
    this.getNotes()
  }
  getNotes(){
    this.perfumService.getNotes().subscribe({
      next: res=>{
        this.notes = res;
      }, 
      error: error=>{
        console.log(error)
      }
    })
  }
}
