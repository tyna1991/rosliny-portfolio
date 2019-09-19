import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../form-data.service';
import { Wymagania } from '../../formdata.model';
import { SubmitService } from '../../submit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import {WorkflowService} from './../../workflow.service';
import {STEPS} from './../../workflow.model';

@Component({
  selector: 'app-wymagania',
  templateUrl: './wymagania.component.html',
  styleUrls: ['./wymagania.component.css']
})
export class WymaganiaComponent implements OnInit {
  title = 'Opis ogolny';
  wymagania: Wymagania;
  wymaganiaForm:FormGroup;
  submitted:boolean;
  naslonecznienie = [
  { name: 'stanowisko słoneczne' },
  { name: 'stanowisko półcieniste' },
  { name: 'stanowisko cieniste' },
  ];
  gleba = [
    { name: 'żyzna' },
  { name: 'umiarkowanie żyzna' },
  { name: 'przeciętna' },
  ];
  wilgotnosc = [
    { name: 'duża' },
  { name: 'średnia' },
  { name: 'słaba' },
  ];
  phArray=["-4,5","4,5", "5","5,5", "6","6,5", "7", "7,5", "7,5-"];
  constructor(private submitService:SubmitService, private activeRoute:ActivatedRoute, private router: Router, private formDataService: FormDataService, private formBuilder: FormBuilder, private workflowService: WorkflowService) {
  }

  ngOnInit() {
      this.wymagania = this.formDataService.getWymagania();
      this.wymaganiaForm = this.formBuilder.group({
        naslonecznienie: new FormArray([]),
        gleba: new FormArray([]),
        wilgotnosc: new FormArray([]),
        phOd: [''],
        phDo: [''],
    });
    this.onChanges();
    this.addCheckboxes();
    if(this.wymagania.naslonecznienie==undefined){
        this.wymagania.naslonecznienie=[];
    }
    if(this.wymagania.gleba==undefined){
        this.wymagania.gleba=[];
    }
    if(this.wymagania.wilgotnosc==undefined){
        this.wymagania.wilgotnosc=[];
    }
    this.wymaganiaForm.patchValue({
       // naslonecznienie : this.wymagania.naslonecznienie,
        //gleba: this.wymagania.gleba,
        //wilgotnosc: this.wymagania.wilgotnosc,
        phOd:  this.wymagania.phOd,
        phDo:  this.wymagania.phDo,
      });
      this.wymaganiaForm.setValidators(this.isphValid());
      this.formDataService.checkValidateStateWymagania(this.wymaganiaForm.valid);
  }
  save(form: any): boolean {
    this.submitted = true;
      if (!form.valid) {
        return false;
          
      }
      var values:Wymagania={
        naslonecznienie: this.wymaganiaForm.value.naslonecznienie,
        gleba: this.wymaganiaForm.value.gleba,
        wilgotnosc: this.wymaganiaForm.value.wilgotnosc,
        phOd: this.wymaganiaForm.value.phOd,
        phDo: this.wymaganiaForm.value.phDo,
        //zdjecie
      }

      console.log(values);
      this.formDataService.setWymagania(values);
      this.workflowService.validateStep(STEPS.wymagania, true);
      return true;
  }
  goToPrevious(form: any) {
    if (this.save(this.wymaganiaForm)) {
        // Navigate to the personal page
        this.router.navigate(['../opis-ogolny'], {relativeTo: this.activeRoute});
    }
}
  goToNext() {
      if (this.save(this.wymaganiaForm)) {
          // Navigate to the work page
          this.router.navigate(['../pielegnacja'], {relativeTo: this.activeRoute});
      }
  }
  goToLast(){
    if (this.save(this.wymaganiaForm)) {
        // Navigate to the work page
        this.router.navigate(['../udalo-sie'], {relativeTo: this.activeRoute});
        this.submitService.submit();
    }
  }
  tabClick(){
    console.log('click');
    if(this.wymaganiaForm!=undefined){
        this.save(this.wymaganiaForm);
      //this.workflowService.validateStep(STEPS.wymagania, true);
    }
    
}
onChanges(){
    this.wymaganiaForm.valueChanges.subscribe(val=>{
        this.formDataService.checkValidateStateWymagania(this.wymaganiaForm.valid);
        
    })
  }
addCheckboxes(){
    this.gleba.map((o, i) => {
    let controlGleba;
    if (this.wymagania.gleba!=undefined){
        if(this.wymagania.gleba[i]==1){
            controlGleba = new FormControl(true);
        }
        else{
            controlGleba = new FormControl(false);
        }
    }
    else{
        controlGleba = new FormControl(false);
       
    }
    (this.wymaganiaForm.controls.gleba as FormArray).push(controlGleba);
    });

    
    this.naslonecznienie.map((o, i) => {
        let controlNaslonecznienie;
        if (this.wymagania.naslonecznienie!=undefined){
            if(this.wymagania.naslonecznienie[i]==1){
                controlNaslonecznienie = new FormControl(true);
            }
            else{
                controlNaslonecznienie = new FormControl(false);
            }
        }
        else{
            controlNaslonecznienie = new FormControl(false);
        }

        (this.wymaganiaForm.controls.naslonecznienie as FormArray).push(controlNaslonecznienie);

      });
      this.wilgotnosc.map((o, i) => {
      let controlWilgotnosc;
        if (this.wymagania.wilgotnosc!=undefined){
            if(this.wymagania.wilgotnosc[i]==1){
                controlWilgotnosc = new FormControl(true);
            }
            else{
                controlWilgotnosc = new FormControl(false);
            }
        }
        else{
            controlWilgotnosc = new FormControl(false);
            
        }
        (this.wymaganiaForm.controls.wilgotnosc as FormArray).push(controlWilgotnosc);
        
});
}
public isphValid(): ValidatorFn{
    return (group: FormGroup) : ValidatorFn => {
      const Od = group.controls['phOd'];
      const Do = group.controls['phDo'];
      var phIndexOd = this.phArray.findIndex((element)=>
      {return element == Od.value}
    );
    var phIndexDo = this.phArray.findIndex((element)=>
      {return element == Do.value;}
    );
    if(phIndexOd-phIndexDo>0){
      Do.setErrors({error:'wprowadź poprawny zakres pH'})
    }else{
      Do.setErrors(null)
    }
    return
    } 
}

}
