import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { app } from '../../server';
import { AppComponent } from './app.component';
import { PerfumsComponent } from './components/perfums/perfums.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'perfums', component: PerfumsComponent},
  /* {path: 'login', component: PerfumsComponent}
  {path: 'register', component: PerfumsComponent} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
