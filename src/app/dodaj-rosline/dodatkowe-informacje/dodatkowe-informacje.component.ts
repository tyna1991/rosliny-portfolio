import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../form-data.service';
import { SubmitService } from '../../submit.service';
import { DodatkoweInformacje, Grupy } from '../../formdata.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import {WorkflowService} from './../../workflow.service';
import {STEPS} from './../../workflow.model';
import {SavePlantService} from './../../save-plant.service';

@Component({
  selector: 'dodatkowe-informacje',
  templateUrl: './dodatkowe-informacje.component.html',
  styleUrls: ['./dodatkowe-informacje.component.css']
})
export class DodatkoweInformacjeComponent implements OnInit {
  dodatkowe: DodatkoweInformacje;
  form: any;
  dodatkoweForm:FormGroup;
 // newGroup:FormGroup;
  grupy:Grupy;
  open:boolean = false;
  submitted:boolean = false;
  //nameExist:boolean = false;
  defaultGroup;
  grupySub:any[];

  constructor(private submitService:SubmitService, private activeRoute:ActivatedRoute, private savePlantService : SavePlantService, private router: Router, private formDataService: FormDataService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    //   if(this.grupy==undefined){
    //       this.grupy={nazwa:['grupa domyślna']};
    //   }
      
      //this.savePlantService.saveGrupy(this.grupy.nazwa);
      this.grupy={nazwa:['']};
      this.grupy.nazwa = this.savePlantService.getGrupy();
      if(this.grupy.nazwa==null){
        this.grupy={nazwa:['']};
        this.grupy.nazwa=['grupa domyślna'];
      }
      this.dodatkowe = this.formDataService.getDodatkowe();
      this.defaultGroup=this.dodatkowe.grupa;
      if(this.dodatkowe.grupa==undefined){
        this.defaultGroup = this.grupy.nazwa[0];
      }
          
      this.dodatkoweForm = this.formBuilder.group({
        grupa: [this.defaultGroup],
        inne: [''],
        
    });
    // this.newGroup = this.formBuilder.group({
    //     nazwa: ['', Validators.required],
    // });
    this.dodatkoweForm.patchValue({
         grupa:  this.dodatkowe.grupa,
         inne:  this.dodatkowe.inne,
       });
       //this.onChanges();
       this.formDataService.currentGroups.subscribe(val=>{
            this.grupy.nazwa=val as string[];
       })

       
       
  }

  save(form: any): boolean {
      if (!form.valid) {
          return false;
      }
      var values:DodatkoweInformacje={
        grupa: this.dodatkoweForm.value.grupa,
        inne: this.dodatkoweForm.value.inne,
      }
      this.formDataService.setDodatkowe(values);
      
      return true;
  }

  goToPrevious() {
    if (this.save(this.dodatkoweForm)) {
        // Navigate to the personal page
        this.router.navigate(['../pielegnacja'], {relativeTo: this.activeRoute});
    }
}
  // goToNext() {
  //     if (this.save(this.dodatkoweForm)) {
  //         // Navigate to the work page
  //         this.router.navigate(['../udalo-sie'], {relativeTo: this.activeRoute});
  //     }
  // }
  goToLast(){
    if (this.save(this.dodatkoweForm)) {
       // this.router.navigate(['../udalo-sie'], {relativeTo: this.activeRoute});
       this.submitService.submit();
    }
  }
  tabClick(){
    console.log('click');
    if(this.dodatkoweForm!=undefined){
        this.save(this.dodatkoweForm);
      // this.workflowService.validateStep(STEPS.wymagania, false);
    }
    
 }
// saveGroup(form:any){
// this.submitted=true;
// if(this.grupy.nazwa.findIndex(element => element==form.value.nazwa)!=-1){
//     this.nameExist=true;
//     return false;
// };
// if (!form.valid) {
//     console.log('save-invalid');
//     return false;
//   }
  
//     this.grupy.nazwa.push(form.value.nazwa);
// this.open=!this.open;
// //this.formDataService.setGrupy(this.grupy.nazwa);
// this.savePlantService.saveGrupy(this.grupy.nazwa);
// this.newGroup = this.formBuilder.group({
//     nazwa: ['', Validators.required],
// });
// this.submitted=false;
  
  

// }
 openModal(){
 this.open=true;
 }
 onClose(notOpen:boolean){
    this.open=notOpen;
 }
// closeModal(){
//     this.open=!this.open;
// }

// onChanges(){
//     this.newGroup.valueChanges.subscribe(val=>{
//        this.nameExist=false; 
//     })
//   }
}
