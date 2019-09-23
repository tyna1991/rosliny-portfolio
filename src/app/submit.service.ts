import { Injectable } from '@angular/core';
import {FormDataService} from './form-data.service';
import {Formdata} from './formdata.model';
import {SavePlantService} from './save-plant.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  formData: Formdata;
  isFormOgolnyValid: boolean = false;
  plants:Formdata[];
  idArray:number[]=[];
  maxId:number;
  grupy:string[];
  constructor(private formDataService:FormDataService, private savePlantService:SavePlantService, private router:Router ) { }
  submit(){
    this.grupy=this.savePlantService.getGrupy();
    this.formDataService.currentGroups.subscribe(val=>{
         this.grupy=val as string[];
    })
    this.formData = this.formDataService.getFormData();
    if(this.formData.zdjecie=='#' || this.formData.zdjecie==undefined){
        this.formData.zdjecie='../../assets/images/default.png'
    }
    if(this.formData.grupa==undefined || this.formData.grupa==''){
        this.formData.grupa='grupa domyślna';
        if(this.grupy!=null){
            let index=this.grupy.findIndex(elem=>elem=="grupa domyślna");
            console.log(index);
        if(index==-1){
                this.grupy.push('grupa domyślna');
                this.savePlantService.saveGrupy(this.grupy);
                this.formDataService.checkGroups(this.grupy);
        }          
    }else{
                this.grupy=[];
                this.grupy.push('grupa domyślna');
                this.savePlantService.saveGrupy(this.grupy);
                this.formDataService.checkGroups(this.grupy);
    }
    
  }
  this.isFormOgolnyValid = this.formDataService.isFormOgolnyValid();
  this.plants=this.savePlantService.get();
  

  console.log("submit");
  this.idArray=[];
        console.log(this.formData);
        let indexExist=-1;
        console.log(this.plants);
        if(this.plants!=null && this.plants.length>0){
            this.plants.forEach((elem)=>{
                this.idArray.push(elem.id);
            })
            indexExist=this.idArray.findIndex(elem=>elem==this.formData.id);
            if(indexExist!=-1){
                this.maxId=this.formData.id;
            }else{
                this.maxId=this.idArray.reduce((a, b)=>Math.max(a, b));
                this.maxId = this.maxId+1;
            }
           
        }
        else{
            this.maxId=1;
        }
        
        if(indexExist!=-1){ //jeżeli edytujemy istniejące id
            this.plants.splice(indexExist,1);
                  this.formData.id=this.maxId;
                  //this.plants[indexExist]=this.formdata;
                  this.plants.splice(indexExist,0,this.formData);
                  this.savePlantService.savePlants(this.plants); 
                  this.formData = this.formDataService.resetFormData();
                  this.formDataService.resetSample();
                  this.isFormOgolnyValid = false;
                  this.router.navigate(['/plant/', this.maxId]);
                  return false;
                 
        }
        else{
            this.formData.id=this.maxId;
            this.savePlantService.save(this.formData);
        }


        
        this.formData = this.formDataService.resetFormData();
        this.formDataService.resetSample();
        this.isFormOgolnyValid = false;
        this.router.navigate(['/']);

};

}
