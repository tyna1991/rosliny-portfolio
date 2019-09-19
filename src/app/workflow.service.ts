import { Injectable } from '@angular/core';
import {STEPS} from './workflow.model';
import { Router, ActivatedRoute, UrlSegment, RouterState, RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
constructor(private router:Router, private activatedRoute: ActivatedRoute){
    
}
  private workflow = [
    { step: STEPS.ogolny, valid: false },
    { step: STEPS.wymagania, valid: true },
    { step: STEPS.pielegnacja, valid: true },
    { step: STEPS.dodatkowe, valid: true },
    { step: STEPS.gotowe, valid: true }
];

validateStep(step: string, valid:boolean) {
  // If the state is found, set the valid field to true 
  var found = false;
  for (var i = 0; i < this.workflow.length && !found; i++) {
      if (this.workflow[i].step === step) {
          found = this.workflow[i].valid = valid;
      }
  }
}

resetSteps() {
  // Reset all the steps in the Workflow to be invalid
  this.workflow.forEach(element => {
      element.valid = false;
  });
}

getFirstInvalidStep(step: string) : string {
  // If all the previous steps are validated, return blank
  // Otherwise, return the first invalid step
  var found = false;
  var valid = true;
  var redirectToStep = '';
  let indexStep=this.workflow.findIndex(elem=> elem.step==step);
  for (var i = 0; i < this.workflow.length && !found && valid; i++) {
      let item = this.workflow[i];
      if (item.step === step) {
          if(indexStep<=i){
            found = true;
            redirectToStep = '';
          }
           
      }
      else {
          valid = item.valid;
          redirectToStep = item.step
      }
  }

  return redirectToStep;
}




}
