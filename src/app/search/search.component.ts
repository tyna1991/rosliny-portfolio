import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormsModule } from '@angular/forms'
import { FormControl } from '@angular/forms'
import { SearchService } from '../search.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import { Plants } from '../plants';
import { PlantsService } from '../plants.service';
import { SavePlantService } from '../save-plant.service';
import { Formdata } from '../formdata.model';
import { Router, ActivatedRoute } from '@angular/router';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatInput } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService, PlantsService]
})
export class SearchComponent implements OnInit {
  results: any[]=[];
  queryField= new FormControl('');
  //plantslist=[];
  //plantslist:Formdata[]=[];
  empty_List=true;
  @ViewChild('myplants') elementRef: ElementRef;

  
  constructor(private activatedRoute:ActivatedRoute, private router: Router, private searchService: SearchService, private plantsService: PlantsService, private savePlantService:SavePlantService) {
    // this.plantsService.getlistPlantsObs().subscribe((plants: Plants[]) => {this.plantslist=plants; 
    //   if(this.plantslist.length>0){
    //     this.empty_List=false;
    //   }
    //   else{this.empty_List=true}
    //   ;});


   // this.plantslist=this.savePlantService.get();
 
   }
   
  plantsObj:Plants[];//jedna roslina
  selectedValue: any=''; 
  selectedPlantId:number;
  onSelectionChanged(event$) { 
    this.selectedPlantId=event$.option.value.id;
    
   }
  addplant(queryPlant: string, autocomplete: MatAutocompleteTrigger )
  {
      if (queryPlant==""){
        return false;
      }
      if(typeof this.queryField.value!='object'){
        return false; 
      }
      else{
        autocomplete.closePanel(); 
       this.queryField.reset({emitEvent: false});
       this.elementRef.nativeElement.blur();
        this.router.navigateByUrl('plant/' + this.selectedPlantId);
       
        //router

       // this.searchService.getPlant(queryPlant).subscribe((data:Plants[]) => {
       // this.plantsObj=data;
       // this.plantsService.add(this.plantsObj);
    //  }
   // );}
      }
    }
    displayFn(plant: Formdata): string {
      if(plant.odmiana!=undefined){
        return plant.gatunek+" '"+plant.odmiana+"'";
      }
      return plant? plant.gatunek: plant.gatunek;
  }
  ngOnInit() {
    this.queryField.valueChanges.debounceTime(200)
    .distinctUntilChanged().switchMap((query)=>this.searchService.search(query)).subscribe(response =>{
      this.results=response;
    });
  }
  

}
