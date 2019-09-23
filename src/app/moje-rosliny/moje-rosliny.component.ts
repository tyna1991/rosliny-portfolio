import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms'
import { Plants } from '../plants';
import { SavePlantService } from '../save-plant.service';
import { Formdata, Grupy } from '../formdata.model';
import { FormDataService } from '../form-data.service';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';



@Component({
  selector: 'app-moje-rosliny',
  templateUrl: './moje-rosliny.component.html',
  styleUrls: ['./moje-rosliny.component.css'],
})
export class MojeRoslinyComponent implements OnInit, OnDestroy {
  grupy:string[];
  groupWithPlants:string[]=[];
  //groupHasPlants:Formdata[]=[];
  subs = new Subscription();
  showEdit:boolean = false;
  hasPlants:boolean = false;
  open:boolean = false;
  selectedGroup:string="";
  nameExist:boolean=false;
  // searchTerm$ = new Subject<String>();
  // results = Object;
 constructor(private savePlantService:SavePlantService, private formDataService: FormDataService, private dragulaService: DragulaService, private formBuilder:FormBuilder ) { 
 //  this.searchService.search().subscribe(results=>{this.results = results.results;})
 dragulaService.createGroup("dragula", {
   isContainer: function (el) {
     return el.classList.contains('dragula');
   },
  moves: function (el, container, target) {
    return !target.classList.contains('plant-move');
},
  accepts: function(el, container, target, source) {
   return el.classList.contains('group') && !container.classList.contains('plant-move') ||
    el.classList.contains('single-plant') && !container.classList.contains('group-move');
  }
});

 this.subs.add(this.dragulaService.drop("dragula")
      .subscribe(({ name, el, target, source, sibling }) => {
      if(el.classList.contains('single-plant')){
        let id=Number(el.getAttribute('data-plantid'));
        //let grupa = el.getAttribute('data-plantgroup');
        let grupaTagert = target.getAttribute('data-groupname');
        let indexDroppedPlant= this.plants.findIndex((plant=>plant.id==id));
        if(indexDroppedPlant!=-1){
          if(this.plants[indexDroppedPlant].grupa!=grupaTagert){
            //zmiana kolejnosci
            let newIndex;
            let oldIndex=indexDroppedPlant;
            let droppedPlant:Formdata=this.plants[indexDroppedPlant];
                if(sibling==null){
                  newIndex=this.plants.length-1;
                }else{
                  let siblingId=Number(sibling.getAttribute('data-plantid'));
                  let siblingIndex;
                  this.plants.filter((plant,index)=>{
                      if(plant.id==siblingId){
                        siblingIndex=index
                      }
                  });
                  if(oldIndex<siblingIndex){
                    newIndex=siblingIndex-1;
                  }else{
                    newIndex=siblingIndex;
                  }
                }
                console.log("nowyIndex"+newIndex);
                console.log("staryIndex"+oldIndex);
                //zmiana grupy
                droppedPlant.grupa=grupaTagert;
                this.plants.splice(oldIndex,1);
                this.plants.splice(newIndex,0,droppedPlant);
                this.savePlantService.savePlants(this.plants);
            
            //this.savePlantService.savePlants(this.plants);
            this.plants=this.savePlantService.get();
            this.checkIfGroupsHasPlants();
          } 
          else{
            let newIndex;
            let oldIndex=indexDroppedPlant;
            let droppedPlant:Formdata=this.plants[indexDroppedPlant];
                if(sibling==null){
                  newIndex=this.plants.length-1;
                }else{
                  let siblingId=Number(sibling.getAttribute('data-plantid'));
                  let siblingIndex;
                  this.plants.filter((plant,index)=>{
                      if(plant.id==siblingId){
                        siblingIndex=index
                      }
                  });
                  if(oldIndex<siblingIndex){
                    newIndex=siblingIndex-1;
                  }else{
                    newIndex=siblingIndex;
                  }
                }
                console.log("nowyIndex"+newIndex);
                console.log("staryIndex"+oldIndex);
                //if(newIndex=!oldIndex){
                  this.plants.splice(oldIndex,1);
                this.plants.splice(newIndex,0,droppedPlant);
                this.savePlantService.savePlants(this.plants);
                this.plants=this.savePlantService.get();
               // }
                
                
          }
        }
    //     this.plants.filter((plant, index) =>{
    //       if(plant.id==id){
    //         if(plant.grupa!=grupaTagert){
    //           plant.grupa=grupaTagert;
    //           this.savePlantService.savePlants(this.plants);
    //           this.plants=this.savePlantService.get();
    //           this.checkIfGroupsHasPlants();
    //         } 
    //         else{
    //           console.log("event w tej samej grupie");
    //           let newIndex;
    //           let oldIndex=index;
    //               if(sibling==null){
    //                 newIndex=this.plants.length-1;
    //               }else{
    //                 let siblingId=Number(sibling.getAttribute('data-plantid'));
    //                 let siblingIndex;
    //                 this.plants.filter((plant,index)=>{
    //                     if(plant.id==siblingId){
    //                       siblingIndex=index
    //                     }
    //                 });
    //                 if(oldIndex<newIndex){
    //                   newIndex=siblingIndex-1;
    //                 }else{
    //                   newIndex=siblingIndex;
    //                 }
    //               }
    //               console.log("nowyIndex"+newIndex);
    //               console.log("staryIndex"+oldIndex);
    //               //if(newIndex=!oldIndex){
    //                 this.plants.splice(oldIndex,1);
    //               this.plants.splice(newIndex,0,plant);
    //               this.savePlantService.savePlants(this.plants);
    //               this.plants=this.savePlantService.get();
    //              // }
                  
                  
    //         }
    //     }
    // });
      }
      if(el.classList.contains('group')){
        // console.log(this.grupy);
      //let id=Number(el.getAttribute('data-plantid'));
     let childElement= el.firstChild;
      //console.log(childElement['getAttribute']('data-group'));
      let grupa = childElement['getAttribute']('data-group');
      //let childTarget= target.firstChild;
     // let grupaTagert = childTarget['getAttribute']('data-group');
      this.grupy.filter((group, index) =>{
        if(group==grupa){
         
            let newIndex;
            let oldIndex=index;
                if(sibling==null){
                  newIndex=this.grupy.length-1;
                }else{
                  let siblingGroupName=sibling.firstChild['getAttribute']('data-group');
                  let siblingIndex;
                  this.grupy.filter((group,index)=>{
                      if(group==siblingGroupName){
                        siblingIndex=index
                      }
                  });
                  if(oldIndex<newIndex){
                    newIndex=siblingIndex-1;
                  }else{
                    newIndex=siblingIndex;
                  }
                }
                
               // if(newIndex=!oldIndex){
                  this.grupy.splice(oldIndex,1);
                this.grupy.splice(newIndex,0,group);
                this.savePlantService.saveGrupy(this.grupy);
                this.grupy=this.savePlantService.getGrupy();
               // }
                
            }
                });
      }
        

      })
    );

    }
 plants:Formdata[];
 newNameOfGroup:FormGroup;

 private clicked = false;

  
 clickedInside($event: Event){
  $event.preventDefault();
  $event.stopPropagation();  // <- that will stop propagation on lower layers
}
  
@HostListener('document:click', ['$event']) clickedOutside($event){
  if(this.clicked){
   this.selectedGroup="";
  }
}

  ngOnInit() {
    this.plants=this.savePlantService.get();
    this.grupy=this.savePlantService.getGrupy();
    this.checkIfGroupsHasPlants();
    this.formDataService.currentGroups.subscribe(val=>{
      this.grupy=val as string[];
      this.checkIfGroupsHasPlants();
 })
 this.newNameOfGroup = this.formBuilder.group({
  nazwa: [''],
});
    //console.log(this.grupy.indexOf('aaa'));
this.onChanges();
  }
  openModal(){
    this.open=true;
    }
    onClose(notOpen:boolean){
       this.open=notOpen;
    }
  
    checkIfGroupsHasPlants(){
      if(this.plants!=null){
        this.hasPlants=true;
        this.groupWithPlants=[];
        if(this.grupy!=null){
          this.plants.filter((plant) =>{
            this.grupy.filter((group)=>{
              if(plant.grupa==group){
                this.groupWithPlants.push(group);
              }
            });
          });
        }
        
      }
    }
    removeGroup(group:any){
      if(this.plants!=null){
      this.plants = this.plants.filter(x => x.grupa !== group);
    }
    this.savePlantService.savePlants(this.plants);
    this.plants=this.savePlantService.get();
      const index = this.grupy.indexOf(group);
      if(index !==-1){
        this.grupy.splice(index,1);
      }
      this.formDataService.checkGroups(this.grupy);
      this.savePlantService.saveGrupy(this.grupy);
      this.grupy=this.savePlantService.getGrupy();
      
}
removePlant(plant:Formdata){
  if(this.plants!=null){
    this.plants.filter((plantArray, index) =>{
        if(plantArray==plant){
          this.plants.splice(index,1);
      }
  });
}
this.savePlantService.savePlants(this.plants);
    this.plants=this.savePlantService.get();
    this.checkIfGroupsHasPlants()
}
edit(){
  this.clicked=true;
}
submitNewName(form:any){
  
  let newGrupy:string[]=[];
  if(form.value.nazwa==""){
    this.selectedGroup="";
    return false;
  }
  if(this.grupy.findIndex(element => element==form.value.nazwa)!=-1){
    this.nameExist=true;
    return false;
};
this.grupy.filter(el => {
  if(el==this.selectedGroup){
  el=form.value.nazwa;
}
newGrupy.push(el);
});
this.plants.filter(elem=>{if(elem.grupa==this.selectedGroup)
{
  elem.grupa=form.value.nazwa;
}
})
this.savePlantService.savePlants(this.plants);
this.plants=this.savePlantService.get();
this.formDataService.checkGroups(newGrupy);
this.savePlantService.saveGrupy(newGrupy);
this.grupy=this.savePlantService.getGrupy();
this.selectedGroup="";
this.newNameOfGroup = this.formBuilder.group({
        nazwa: [''],
    });
    this.clicked=false;
}
onChanges(){
  this.newNameOfGroup.valueChanges.subscribe(val=>{
     this.nameExist=false; 
  })
}
ngOnDestroy(){
  this.dragulaService.destroy("dragula");
}
}
