import { Component, OnInit } from '@angular/core';
import { PerfumsService } from '../../services/perfums.service';
import { error } from 'console';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfums',
  templateUrl: './perfums.component.html',
  styleUrl: './perfums.component.css'
})
export class PerfumsComponent implements OnInit {
  constructor(public perfumService:PerfumsService, private formBuilder:FormBuilder){}
  public formPerfum: FormGroup = new FormGroup({});
  public notes:any = []
  public noteTypes:any = []
  public origins:any = []
  public showNotes = false;
  public showNoteTypes = false;
  public showOrigins = false;

  ngOnInit(): void {
    this.getNotes();
    this.initialiceForm();
    this.getOrigins();
    this.getNoteTypes();
  }
  ocultarTablas(){
    this.showNotes = false;
    this.showNoteTypes = false;
    this.showOrigins = false;
  }
  getNotes(){
    this.perfumService.getNotes().subscribe({
      next: res=>{
        this.notes = res;
        this.showNotes = true;
        this.showNoteTypes = false;
        this.showOrigins = false;
      }, 
      error: error=>{
        console.log(error)
      }
    })
  }
  getNoteTypes(){
    this.perfumService.getNoteTypes().subscribe({
      next: res=>{
        this.noteTypes = res;
        this.showNotes = false;
        this.showNoteTypes = true;
        this.showOrigins = false;
      }, 
      error: error=>{
        console.log(error)
      }
    })
  }
  getOrigins(){
    this.perfumService.getOrigin().subscribe({
      next: res=>{
        this.origins = res;
        this.showNotes = false;
        this.showNoteTypes = false;
        this.showOrigins = true;
      }, 
      error: error=>{
        console.log(error)
      }
    })
  }
  initialiceForm(){
    this.formPerfum = this.formBuilder.group({
      name: ['', [Validators.required]],
      //size:['',[Validators.required]],
      house: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required]],
      concentration: ['', [Validators.required, Validators]]
    });
  }
  guardarPerfume(){
    
  }
}
