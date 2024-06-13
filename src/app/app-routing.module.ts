import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfumsComponent } from './components/perfums/perfums.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'perfums', component: PerfumsComponent},
  {path: 'catalog', component: CatalogComponent}
  //{path: 'register', component: PerfumsComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
