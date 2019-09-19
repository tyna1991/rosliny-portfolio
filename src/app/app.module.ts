import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';


import { KalendarzComponent } from './kalendarz/kalendarz.component';
import { MojeRoslinyComponent } from './moje-rosliny/moje-rosliny.component';
import { RyneczekComponent } from './ryneczek/ryneczek.component';
import { PowiadomieniaComponent } from './powiadomienia/powiadomienia.component'
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MojeKontoComponent } from './moje-konto/moje-konto.component';
import { WylogujComponent } from './wyloguj/wyloguj.component';
import { DodajRoslineComponent } from './dodaj-rosline/dodaj-rosline.component';
import { DodajRoslineNavbarComponent } from './dodaj-rosline/dodaj-rosline-navbar/dodaj-rosline-navbar.component';
import { OpisOgolnyComponent } from './dodaj-rosline/opis-ogolny/opis-ogolny.component';
import { WymaganiaComponent } from './dodaj-rosline/wymagania/wymagania.component';
import { PielegnacjaComponent } from './dodaj-rosline/pielegnacja/pielegnacja.component';
import { DodatkoweInformacjeComponent } from './dodaj-rosline/dodatkowe-informacje/dodatkowe-informacje.component';
import { ResultComponent } from './dodaj-rosline/result/result.component';
import {WorkflowService} from './workflow.service';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { AddGroupModalComponent } from './add-group-modal/add-group-modal.component';
import { DragulaModule } from 'ng2-dragula';
import { SinglePlantComponent } from './single-plant/single-plant.component';
import{FormDataService} from './form-data.service';
import{SavePlantService} from './save-plant.service';



@NgModule({
  declarations: [
    AppComponent,
    KalendarzComponent,
    MojeRoslinyComponent,
    RyneczekComponent,
    PowiadomieniaComponent,
    SearchComponent,
    MojeKontoComponent,
    WylogujComponent,
    DodajRoslineComponent,
    DodajRoslineNavbarComponent,
    OpisOgolnyComponent,
    WymaganiaComponent,
    PielegnacjaComponent,
    DodatkoweInformacjeComponent,
    ResultComponent,
    ColorPickerComponent,
    AddGroupModalComponent,
    SinglePlantComponent
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    DragulaModule.forRoot()

    
  ],
  providers: [FormDataService, SavePlantService, { provide: WorkflowService, useClass: WorkflowService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
