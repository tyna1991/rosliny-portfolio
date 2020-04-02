import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import{FormDataService} from './../../form-data.service';
import{ActiveLinkService} from './../../active-link.service';
import { Router, ActivatedRoute } from '@angular/router';
import {WorkflowService} from './../../workflow.service';
import {STEPS} from './../../workflow.model';

@Component({
  selector: 'app-dodaj-rosline-navbar',
  templateUrl: './dodaj-rosline-navbar.component.html',
  styleUrls: ['./dodaj-rosline-navbar.component.css']
})
export class DodajRoslineNavbarComponent implements OnInit {

  constructor(private activeLinkService: ActiveLinkService, private activatedRoute: ActivatedRoute, private formDataService : FormDataService, private router: Router, private workflowService: WorkflowService) { }
canActivateOgolnyCheck:any;
canActivateWymaganiaCheck:any = true;
id:number = 0;
  ngOnInit() {
    this.formDataService.currentValidateOgolny.subscribe(val=>{
      this.canActivateOgolnyCheck=val;;
    });
    this.formDataService.currentValidateWymagania.subscribe(val=>{
      this.canActivateWymaganiaCheck=val;
    })
    this.activeLinkService.currentIdObservable.subscribe(val=>{
      console.log(val);
      this.id=val;
    })
  }


  canActivate1(event: MouseEvent){
    if(this.canActivateWymaganiaCheck){
   // if(this.canActivateValue){
   //   this.workflowService.validateStep(STEPS.ogolny, true);
    this.id=1;
      this.router.navigate(['./opis-ogolny'], {relativeTo: this.activatedRoute});
      this.workflowService.validateStep(STEPS.wymagania, true);
      
    }
    else{
      
      this.workflowService.validateStep(STEPS.wymagania, false);
      event.preventDefault();
      event.stopPropagation();
    }
  }
    //else{
    //  this.workflowService.validateStep(STEPS.ogolny, false);
   // event.preventDefault();
   // event.stopPropagation();
   // console.log(this.canActivateValue);
   // }
    

  //}
  canActivate2(event: MouseEvent){

    if(this.canActivateOgolnyCheck){
      this.id=2;
      this.workflowService.validateStep(STEPS.ogolny, true);
      this.router.navigate(['./wymagania'], {relativeTo: this.activatedRoute});
    }else{
      let element: HTMLElement = document.getElementById('buttonNext') as HTMLElement;
      element.click();
      this.workflowService.validateStep(STEPS.ogolny, false);
    event.preventDefault();
    event.stopPropagation();
    }
    
  }
  canActivate3(event: MouseEvent){

    if(this.canActivateOgolnyCheck  && this.canActivateWymaganiaCheck){
      this.id = 3;
      this.workflowService.validateStep(STEPS.wymagania, true);
     this.workflowService.validateStep(STEPS.ogolny, true);
      this.router.navigate(['./pielegnacja'], {relativeTo: this.activatedRoute});
    }else{
      let element: HTMLElement = document.getElementById('buttonNext') as HTMLElement;
      element.click();
      if(!this.canActivateOgolnyCheck){
        this.workflowService.validateStep(STEPS.ogolny, false);
      }
      if(!this.canActivateWymaganiaCheck){
        this.workflowService.validateStep(STEPS.wymagania, false);
      }
     
    event.preventDefault();
    event.stopPropagation();
    }
    
  }
  canActivate4(event: MouseEvent){

    if(this.canActivateOgolnyCheck && this.canActivateWymaganiaCheck){
      this.id = 4;
      this.workflowService.validateStep(STEPS.wymagania, true);
      this.workflowService.validateStep(STEPS.ogolny, true);
      this.router.navigate(['./dodatkowe-informacje'], {relativeTo: this.activatedRoute});
    }else{
      if(!this.canActivateOgolnyCheck){
        this.workflowService.validateStep(STEPS.ogolny, false);
      }
      if(!this.canActivateWymaganiaCheck){
        this.workflowService.validateStep(STEPS.wymagania, false);
      }
    event.preventDefault();
    event.stopPropagation();
    }
    
  }
  canActivate5(event: MouseEvent){

    if(this.canActivateOgolnyCheck && this.canActivateWymaganiaCheck){
      this.id=5;
      this.workflowService.validateStep(STEPS.wymagania, true);
      this.workflowService.validateStep(STEPS.ogolny, true);
      this.router.navigate(['./udalo-sie'], {relativeTo: this.activatedRoute});
    }else{
      if(!this.canActivateOgolnyCheck){
        this.workflowService.validateStep(STEPS.ogolny, false);
      }
      if(!this.canActivateWymaganiaCheck){
        this.workflowService.validateStep(STEPS.wymagania, false);
      }
    event.preventDefault();
    event.stopPropagation();
    }
  }
  
  
// change(event:any){
// event.preventDefault();
// let element: HTMLElement = document.getElementById('buttonNext') as HTMLElement;
// element.click();
// }
}
