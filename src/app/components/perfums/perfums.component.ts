import { Component, OnInit } from '@angular/core';
import { PerfumsService } from '../../services/perfums.service';
import { error } from 'console';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { PerfumDto } from '../../Models/Perfum/PerfumDto';
import { read } from 'fs';

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
  public base64image: string | ArrayBuffer = "";
  
  ngOnInit(): void {
    this.obtenerDatosIniciales();
    this.initialiceForm();
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
  uploadImage(event:any){
    // si se eligió la imagen
    if (event.target.files.length !== 0 || event.target.files[0] != null )
     {
      // obtengo el archivo completo de la img (nombre, tipo, tamaño, etc..)
      const file = event.target.files[0];
      this.getBase64(file)
    }
  }
  getBase64(file:any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.base64image = reader.result == null ? "" : reader.result
      console.log(typeof this.base64image)
    };    
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  guardarPerfume(){
/*     Swal.fire({
      title: "Sweet!",
      text: "Modal with a custom image.",
      imageUrl: this.base64image.toString(),
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    }); */
    if(this.formPerfum.valid){
      this.mappearDatosPerfume()
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Por favor ingresa todos los campos',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }
  mappearDatosPerfume(){
    let datos = this.formPerfum.value
    let perfum:PerfumDto = {
      name : datos.name,
      idHouse : datos.house,
      idGender : datos.gender,
      idOrigin : this.obtenerOrigin(datos.house),
      status : datos.status == 0 ? false : true,
      description : datos.description,
      idConcentration : datos.concentration,
      photo : this.base64image
    }
    console.log(perfum)
  }
  mappearSizes(){

  }
  obtenerOrigin(house:number):number{
    this.origins.forEach((item:any) => {
      if(item.idHouse == house){
        return item.idOrigin
      }
    });
    return 0
  }
  eliminarDiacriticos(texto:string) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
  }
  initialiceForm(){
    this.formPerfum = this.formBuilder.group({
      name: ['', [Validators.required]],
      //size:['',[Validators.required]],
      house: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      salida: ['', [Validators.required]],
      corazon: ['', [Validators.required]],
      fondo: ['', [Validators.required]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required]],
      concentration: ['', [Validators.required]],
      photo:['', [Validators.required]]
    });
  }
}
