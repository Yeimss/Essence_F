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
  public notes:any = [];
  public noteTypes:any = [];
  public origins:any = [];
  public sizes:any = [];
  public concentrations:any = [];
  public genders:any = [];

  ngOnInit(): void {
    this.initialiceForm();
    this.obtenerDatosIniciales();
  }


  obtenerDatosIniciales(){
    this.getNotes();
    this.getOrigins();
    this.getNoteTypes();
    this.getConcentrations();
    this.getGenders();
    this.getSizes();
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
  getNoteTypes(){
    this.perfumService.getNoteTypes().subscribe({
      next: res=>{
        this.noteTypes = res;
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
        console.log(this.origins)
      }, 
      error: error=>{
        console.log(error)
      }
    })
  }
  getConcentrations(){
    this.perfumService.getConcentrations().subscribe({
      next: res=>{
        this.concentrations = res;
      }, 
      error: error=>{
        console.log(error)
      }
    })
  }
  getGenders(){
    this.perfumService.getGenders().subscribe({
      next: res=>{
        this.genders = res;
      }, 
      error: error=>{
        console.log(error)
      }
    })
  }
  getSizes(){
    this.perfumService.getSizes().subscribe({
      next: res=>{
        this.sizes = res;
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
      concentration: ['', [Validators.required]]
    });
  }
  guardarPerfume(){
    
  }
}
