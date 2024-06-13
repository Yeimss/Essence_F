import { Component, OnInit } from '@angular/core';
import { PerfumsService } from '../../services/perfums.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { PerfumDto } from '../../Models/Perfum/PerfumDto';
import { SizeDto } from '../../Models/Perfum/SizeDto';
import $ from 'jquery';

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
  public tamañosObtenidos: any;
  
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
  alertError(titulo:string,msj:string){
    let timerInterval :any;
    Swal.fire({
      title: titulo,
      html: msj,
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()?.querySelector("b");
        timerInterval = setInterval(() => {
          if(timer){
            timer.textContent = `${Swal.getTimerLeft()}`;
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {});
  }
  guardarPerfume(){
    if(this.formPerfum.valid){
      this.mappearDatosPerfume();
    }else{
      this.alertError("Error","Por favor diligenciar todos los datos")
    }
  }
  mappearDatosPerfume(){
    this.tamañosObtenidos = this.mappearSizes()
    let datos = this.formPerfum.value
    let perfum:PerfumDto = {
      Name : datos.name,
      IdHouse : datos.house,
      IdGender : datos.gender,
      IdOrigin : this.obtenerOrigin(datos.house),
      Status : datos.status == 0 ? false : true,
      Description : datos.description,
      IdConcentration : datos.concentration,
      Photo : this.base64image
    }
    this.perfumService.insertPerfum(perfum).subscribe({
      next: res => {
        this.formPerfum.reset()
        this.alertError("Exito","Perfume ingresado exitosamente")
        console.log(res);
      },
      error: e => {
        this.alertError("Error","No se pudo guardar el perfume")
        console.log(e)
      }
    })
  }
  mappearSizes(){
    let tamaños : any = [];
    
    this.sizes.forEach((size:any) => {
      if($('#btn-check-'+size.idSize).is(":checked")){
        let tamaño:SizeDto = {
          idSize: size.idSize,
          size: size.size
        }
        tamaños.push(tamaño); 
      }
    });

    return tamaños;
  }
  obtenerOrigin(house:number):number{
    var origen = 0;
    this.origins.forEach((item:any) => {
      if(item.idHouse == house){
        origen = item.idOrigin;
      }
    });
    return origen;
  }
  eliminarDiacriticos(texto:string) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
  }
  initialiceForm(){
    this.formPerfum = this.formBuilder.group({
      name: ['', [Validators.required]],
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
