import { Component, OnInit, Input } from '@angular/core';
import { FormDataService } from '../../form-data.service';
import { Formdata } from '../../formdata.model';
import { Router } from '@angular/router';
import { SavePlantService } from './../../save-plant.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  title = 'Roślina została dodana';
    @Input() formData: Formdata;
    isFormOgolnyValid: boolean = false;
    plants:Formdata[];
    idArray:number[]=[];
    maxId:number;
    grupy:string[];
    constructor(private formDataService: FormDataService, private savePlantService: SavePlantService, private router:Router) {
    }
 
    ngOnInit() {
        this.grupy=this.savePlantService.getGrupy();
        this.formDataService.currentGroups.subscribe(val=>{
             this.grupy=val as string[];
        })
        console.log(this.grupy);
        this.formData = this.formDataService.getFormData();
        if(this.formData.zdjecie=='#' || this.formData.zdjecie==undefined){
            this.formData.zdjecie='../../assets/images/default.png'
        }
        if(this.grupy==undefined || !(this.grupy.length)){
                    this.grupy=[];
                    this.grupy.push('grupa domyślna');
                    this.savePlantService.saveGrupy(this.grupy);
                    this.formDataService.checkGroups(this.grupy);  
    }else{
        const index = this.grupy.findIndex((elem)=>{return elem=="grupa domyślna"});
        if(index<0){
            this.grupy.push('grupa domyślna');
            this.savePlantService.saveGrupy(this.grupy);
            this.formDataService.checkGroups(this.grupy);  
        }
    }
   

    this.isFormOgolnyValid = this.formDataService.isFormOgolnyValid();
    this.plants=this.savePlantService.get();
}
    submit() {
        console.log(this.grupy);
        console.log("submit");
        console.log(this.formData);
        let indexExist=-1;
        console.log(this.plants);
        if(this.plants!=null && this.plants.length>0){
            this.plants.forEach((elem)=>{
                this.idArray.push(elem.id);
            })
            indexExist=this.idArray.findIndex(elem=>elem==this.formData.id);
            console.log(this.formData.id);
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
        
        if(indexExist!=-1){
                  this.plants.splice(indexExist,1);
                  console.log(indexExist);
                  this.formData.id=this.maxId;
                  //this.plants[indexExist]=this.formdata;
                  console.log(this.formData);
                  this.plants.splice(indexExist,0,this.formData);
                  this.savePlantService.savePlants(this.plants);  
                  console.log(this.plants);
                 
        }
        else{
            this.formData.id=this.maxId;
            this.savePlantService.save(this.formData);
        }


        
        this.formData = this.formDataService.resetFormData();
        this.formDataService.resetSample();
        this.isFormOgolnyValid = false;
        this.router.navigate(['/']);
    }
    tabClick(){

}
}
