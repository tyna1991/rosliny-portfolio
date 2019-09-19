import { Injectable } from '@angular/core';
import { Formdata } from './formdata.model';

@Injectable({
  providedIn: 'root'
})
export class SavePlantService {

  constructor() { }
  save(object:Formdata){
    let plants: any[] = JSON.parse(localStorage.getItem('plants')) || [];
    plants.push(object);
    localStorage.setItem("plants", JSON.stringify(plants));
}
savePlants(object:Formdata[]){
  let plants: any[] = JSON.parse(localStorage.getItem('plants')) || [];
  plants=object;
  localStorage.setItem("plants", JSON.stringify(plants));
}
saveGrupy(nazwy:string[]){
  let grupy: any[] = JSON.parse(localStorage.getItem('grupy')) || [];
    grupy=nazwy;
    localStorage.setItem("grupy", JSON.stringify(grupy));
}
get(){
  if (localStorage.getItem("plants") == "undefined") {
    return [];
  }
  else{
      return JSON.parse(localStorage.getItem('plants'));
  }
}
getPlant(id:string){
  let plants=JSON.parse(localStorage.getItem('plants'));
  if(plants!=null){
    return plants.filter(elem=>elem.id==id);
  }
  
}
getGrupy(){
  if (localStorage.getItem("grupy") == "undefined") {
    return [];
  }
  else{
      return JSON.parse(localStorage.getItem('grupy'));
  }
}
}


