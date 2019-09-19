import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SavePlantService } from './save-plant.service';
import { Formdata } from './formdata.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Plants } from './plants';
import { Subject } from '../../node_modules/rxjs';


@Injectable()

export class SearchService {

  baseUrl: string = 'https://my-json-server.typicode.com/tyna1991/json/plants';
  queryUrl: string = '?q=';
  plants:Formdata[]=[];
  constructor(private http: HttpClient, private savePlantService:SavePlantService) {
   }
   private planListObs = new Subject<Plants[]>();
   private matchingPlant=new Subject<Formdata[]>();
   search(query: string): Observable<any>
   {
    this.plants = this.savePlantService.get();
    let arraytmp:Formdata[]=[];
  if(typeof query!= 'object'){
    this.plants.filter(elem=>{
      if(elem.gatunek.toLowerCase().includes(query.toLowerCase())||(elem.nazwaLacinska != undefined && elem.nazwaLacinska.toLowerCase().includes(query.toLowerCase()))||(elem.odmiana != undefined && elem.odmiana.toLowerCase().includes(query.toLowerCase())))
      {
        arraytmp.push(elem); 
      }
    })
    this.matchingPlant.next(arraytmp);
    //let URL = this.baseUrl + this.queryUrl+query;
    return this.matchingPlant.asObservable();
  }
  arraytmp=[];
  this.matchingPlant.next(arraytmp);
  return this.matchingPlant.asObservable();
   }

   getPlant(query: string): Observable<Plants[]>
   {
    let URL = this.baseUrl + this.queryUrl+query;
    return this.http.get<Plants[]>(URL, {responseType: 'json'});
   }
    getAddedPlant(): Observable<Plants[]>
    {
     let URL = this.baseUrl + "?isAdded=true";
     return this.http.get<Plants[]>(URL, {responseType: 'json'});
    }
   changePlant(plant: Plants): Observable<Plants>
   {
    let URL = this.baseUrl+"/"+plant.id;
    return this.http.patch<Plants>(URL, plant, {responseType: 'json'});
   }
 
}
