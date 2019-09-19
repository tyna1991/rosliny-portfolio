import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { KalendarzComponent } from '../kalendarz/kalendarz.component';
import { MojeRoslinyComponent } from '../moje-rosliny/moje-rosliny.component';
import { RyneczekComponent } from '../ryneczek/ryneczek.component';
import { PowiadomieniaComponent } from '../powiadomienia/powiadomienia.component';
import{DodajRoslineComponent} from '../dodaj-rosline/dodaj-rosline.component';
import{OpisOgolnyComponent} from '../dodaj-rosline/opis-ogolny/opis-ogolny.component';
import{WymaganiaComponent} from '../dodaj-rosline/wymagania/wymagania.component';
import{PielegnacjaComponent} from '../dodaj-rosline/pielegnacja/pielegnacja.component';
import{DodatkoweInformacjeComponent} from '../dodaj-rosline/dodatkowe-informacje/dodatkowe-informacje.component';
import{ResultComponent} from '../dodaj-rosline/result/result.component';
import{SinglePlantComponent} from '../single-plant/single-plant.component';
import { WorkflowGuard } from './../workflow-guard.service';


const appRoutes:Routes=[
  {path: '', component: MojeRoslinyComponent},
  {path: 'kalendarz', component: KalendarzComponent},
  {path: 'ryneczek', component: RyneczekComponent},
  {path: 'powiadomienia', component: PowiadomieniaComponent},
  {path: 'dodaj-rosline',  component: DodajRoslineComponent,
children:[
    {
        path: '',
        redirectTo: 'opis-ogolny',
        pathMatch: 'full'
      },
  {path: 'opis-ogolny', 
  component: OpisOgolnyComponent, canActivate: [WorkflowGuard]
 },
 {path: 'pielegnacja', component: PielegnacjaComponent, canActivate: [WorkflowGuard]},
  {path: 'wymagania', component: WymaganiaComponent, canActivate: [WorkflowGuard]},
  {path: 'dodatkowe-informacje', component: DodatkoweInformacjeComponent, canActivate: [WorkflowGuard]},
  {path: 'udalo-sie', component: ResultComponent, canActivate: [WorkflowGuard]},
], 
},
{path: 'edit/:id',  component: DodajRoslineComponent,
children:[
  {
    path: '',
    redirectTo: 'opis-ogolny',
    pathMatch: 'full'
  },
  {path: 'opis-ogolny', 
  component: OpisOgolnyComponent, canActivate: [WorkflowGuard]
 },
 {path: 'pielegnacja', component: PielegnacjaComponent, canActivate: [WorkflowGuard]},
  {path: 'wymagania', component: WymaganiaComponent, canActivate: [WorkflowGuard]},
  {path: 'dodatkowe-informacje', component: DodatkoweInformacjeComponent, canActivate: [WorkflowGuard]},
  {path: 'udalo-sie', component: ResultComponent, canActivate: [WorkflowGuard]},
], 
},
{path: 'plant/:id', component: SinglePlantComponent},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule],
  providers:[WorkflowGuard],
  declarations: []
})
export class AppRoutingModule { }
