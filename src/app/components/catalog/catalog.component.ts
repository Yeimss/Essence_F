import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  constructor(public serviceCatalog:CatalogService){}
  public perfums:any = [];
  ngOnInit(): void {
    this.obtenerPerfumes()
  }

  obtenerPerfumes(){
    this.serviceCatalog.getPerfums().subscribe({
      next: res => {
        this.perfums = res;
        console.log(this.perfums)
      }
    })
  }
}
