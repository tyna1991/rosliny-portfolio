import { Component, OnInit, } from '@angular/core';
import { FormDataService } from '../../form-data.service';
import { SavePlantService } from '../../save-plant.service';
import { SubmitService } from '../../submit.service';
import { OpisOgolny, Formdata } from '../../formdata.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule,ValidationErrors, ValidatorFn  } from '@angular/forms';
import {WorkflowService} from './../../workflow.service';
import {STEPS} from './../../workflow.model';
import {Sample} from './../../color-picker.module';
import { ActiveLinkService } from '../../active-link.service'; 


@Component({
  selector: 'app-opis-ogolny',
  templateUrl: './opis-ogolny.component.html',
  styleUrls: ['./opis-ogolny.component.css']
})
export class OpisOgolnyComponent implements OnInit {
  title = 'Opis ogolny';
  ogolny: OpisOgolny;
  form: any;
  submitted:any = false;
  ogolnyForm:FormGroup;
  colorName:string;
  dateArray=["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
  sample: Sample;
  dateIndexOd:number = 0;
  dateIndexDo:number = 0;
  fileToUpload: File = null;
  imageSrc: string;
  plant:Formdata;
  constructor(private activeLinkService : ActiveLinkService, private submitService:SubmitService, private savePlantService: SavePlantService, private activeRoute:ActivatedRoute, private router: Router, private formDataService: FormDataService, private formBuilder: FormBuilder, private workflowService: WorkflowService) {
  }

  ngOnInit() {
   
    
    this.dateIndexOd= 0;
    this.dateIndexDo= 0;
      this.ogolny = this.formDataService.getOgolny();
      console.log(this.ogolny);
      this.sample = this.formDataService.getSample();
      this.imageSrc='#';
      if(this.ogolny.zdjecie != undefined){
        this.imageSrc=this.ogolny.zdjecie;
        (<HTMLImageElement>document.getElementById('plantImage')).src = this.imageSrc;
       }


      this.colorName= this.ogolny.kolorKwiatow;
      this.ogolnyForm = this.formBuilder.group({
        gatunek: ['', Validators.required],
        odmiana: [''],
        kwitnienieOd: [''],
        kwitnienieDo: [''],
        nazwaLacinska: [''],
        kolorKwiatow: [''],
        wysokosc: ['', Validators.pattern("^[0-9]{1,2}([,.][0-9]{0,2})?$")],
        pokroj: [''],
        zdjecie: [''],
    });
    this.ogolnyForm.setValidators(this.isDateValid());
    this.ogolnyForm.patchValue({
        gatunek: this.ogolny.gatunek,
        odmiana: this.ogolny.odmiana,
        nazwaLacinska: this.ogolny.nazwaLacinska,
        kwitnienieOd: this.ogolny.kwitnienieOd,
        kwitnienieDo: this.ogolny.kwitnienieDo,
        kolorKwiatow: this.ogolny.kolorKwiatow,
        wysokosc: this.ogolny.wysokosc,
        pokroj: this.ogolny.pokroj,
        zdjecie: this.ogolny.zdjecie,
      });
      this.onChanges();
      this.formDataService.checkValidateStateOgolny(this.ogolnyForm.valid);
      
  }
  
  save(form: any): boolean {
    this.submitted = true;
      if (!form.valid) {
        return false;
          
      }
      this.ogolnyForm.value.kolorKwiatow = this.colorName;
      this.formDataService.setSample(this.sample.color);
      var values:OpisOgolny={
        gatunek: this.ogolnyForm.value.gatunek,
        odmiana: this.ogolnyForm.value.odmiana,
        nazwaLacinska: this.ogolnyForm.value.nazwaLacinska,
        kwitnienieOd: this.ogolnyForm.value.kwitnienieOd,
        kwitnienieDo: this.ogolnyForm.value.kwitnienieDo,
        kolorKwiatow: this.ogolnyForm.value.kolorKwiatow,
        wysokosc: this.ogolnyForm.value.wysokosc,
        pokroj: this.ogolnyForm.value.pokroj,
        zdjecie: this.imageSrc,
        id: this.ogolny.id,
      }
      this.formDataService.setOgolny(values);
      this.workflowService.validateStep(STEPS.ogolny, true)
      return true;
  }

  goToNext() {
      if (this.save(this.ogolnyForm)) {
        console.log('gotonext');
          this.router.navigate(['../wymagania'], {relativeTo: this.activeRoute});
          this.activeLinkService.updateId(2);
      }
  }
  goToLast(){
    if (this.save(this.ogolnyForm)) {
        //this.router.navigate(['../udalo-sie'],  {relativeTo: this.activeRoute});
        this.submitService.submit();
    }
  }

  tabClick(event:any){
      console.log('click');
      if(this.ogolnyForm!=undefined){
        if(!this.save(this.ogolnyForm)){
            //this.router.navigate(['dodaj-rosline/opis-ogolny']);
            //this.workflowService.validateStep(STEPS.ogolny, false);
        };
      }
      
  }
  onChanges(){
    this.ogolnyForm.valueChanges.subscribe(val=>{
        this.formDataService.checkValidateStateOgolny(this.ogolnyForm.valid);
        
    })
  }
  saveColorName(color:string){
    this.colorName=color;
  }
  saveColorSample(color:string){
    this.sample.color=color;
  }


  public isDateValid(): ValidatorFn{
    return (group: FormGroup) : ValidatorFn => {
      const Od = group.controls['kwitnienieOd'];
      const Do = group.controls['kwitnienieDo'];
      var dateIndexOd = this.dateArray.findIndex((element)=>
      {return element == Od.value}
    );
    var dateIndexDo = this.dateArray.findIndex((element)=>
      {return element == Do.value;}
    );
    if(dateIndexOd-dateIndexDo>0){
      Do.setErrors({error:'wprowadź poprawną datę'})
    }else{
      Do.setErrors(null)
    }
    return
    } 
   

  }
  readURL(files) {
    var reader = new FileReader();
    reader.onload =() => {
        this.imageSrc=reader.result as string;
        (<HTMLImageElement>document.getElementById('plantImage')).src =  reader.result as string; 
        
    }
    if(files){
      reader.readAsDataURL(files);
    } 
    
}
}
