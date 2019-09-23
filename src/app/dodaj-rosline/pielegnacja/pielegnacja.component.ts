import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../form-data.service';
import { SubmitService } from '../../submit.service';
import { Pielegnacja } from '../../formdata.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import {WorkflowService} from './../../workflow.service';
import {STEPS} from './../../workflow.model';

@Component({
  selector: 'app-pielegnacja',
  templateUrl: './pielegnacja.component.html',
  styleUrls: ['./pielegnacja.component.css']
})
export class PielegnacjaComponent implements OnInit {
  pielegnacja: Pielegnacja;
  form: any;
  pielegnacjaForm:FormGroup;
  
  constructor(private submitService:SubmitService, private activeRoute:ActivatedRoute, private router: Router, private formDataService: FormDataService, private formBuilder: FormBuilder, private workflowService: WorkflowService) {
  }

  ngOnInit() {
      this.pielegnacja = this.formDataService.getPielegnacja();
      this.pielegnacjaForm = this.formBuilder.group({
        zasilanie: [''],
        przycinanie: [''],
        inne: [''],
    });
    this.pielegnacjaForm.patchValue({
        zasilanie:  this.pielegnacja.zasilanie,
        przycinanie:  this.pielegnacja.przycinanie,
        inne:  this.pielegnacja.inne,
       });
  }
  goToPrevious() {
    if (this.save(this.pielegnacjaForm)) {
        // Navigate to the personal page
        this.router.navigate(['../wymagania'], {relativeTo: this.activeRoute});
    }
}
  goToNext() {
      if (this.save(this.pielegnacjaForm)) {
          // Navigate to the work page
          this.router.navigate(['../dodatkowe-informacje'], {relativeTo: this.activeRoute});
      }
  }
  goToLast(){
    if (this.save(this.pielegnacjaForm)) {
        //this.router.navigate(['../udalo-sie'], {relativeTo: this.activeRoute});
        this.submitService.submit();
    }
}
  save(form: any): boolean {
      if (!form.valid) {
          return false;
      }
      var values:Pielegnacja={
        zasilanie: this.pielegnacjaForm.value.zasilanie,
        przycinanie: this.pielegnacjaForm.value.przycinanie,
        inne: this.pielegnacjaForm.value.inne,
      }
      this.formDataService.setPielegnacja(values);
      this.workflowService.validateStep(STEPS.wymagania, true);
      return true;
  }
  tabClick(){
    console.log('click');
    if(this.pielegnacjaForm!=undefined){
        this.save(this.pielegnacjaForm);
        //this.workflowService.validateStep(STEPS.pielegnacja, false);
    }
    
}

 
}
