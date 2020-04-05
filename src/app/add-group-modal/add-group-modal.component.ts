import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Grupy } from '../formdata.model';
import {SavePlantService} from './../save-plant.service';
import { FormDataService } from '../form-data.service';


@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html',
  styleUrls: ['./add-group-modal.component.css']
})
export class AddGroupModalComponent implements OnInit {

  constructor(private savePlantService : SavePlantService, private formBuilder: FormBuilder, private formDataService: FormDataService ) { }
  newGroup:FormGroup;
  grupy:Grupy;
  @Input('open') open:boolean;
  @Output() closed = new EventEmitter<boolean>();
  submitted:boolean = false;
  nameExist:boolean = false;
  ngOnInit() {
    this.newGroup = this.formBuilder.group({
      nazwa: ['', Validators.required],
  });
  this.grupy={nazwa:['']};
      this.grupy.nazwa = this.savePlantService.getGrupy();
      
  this.onChanges();
  this.formDataService.currentGroups.subscribe(val=>{
    this.grupy.nazwa=val as string[];
})
}
  saveGroup(form:any){
    this.submitted=true;
    if(this.grupy.nazwa.findIndex(element => element==form.value.nazwa)!=-1){
        this.nameExist=true;
        return false;
    };
    if (!form.valid) {
        return false;
      }
      
        this.grupy.nazwa.push(form.value.nazwa);
    this.open=!this.open;
    this.formDataService.checkGroups(this.grupy.nazwa);
    this.savePlantService.saveGrupy(this.grupy.nazwa);
    
    this.newGroup = this.formBuilder.group({
        nazwa: ['', Validators.required],
    });
    this.submitted=false;
    this.closed.emit(false);
    }
    // openModal(){
    // this.open=true;
    // }
    closeModal(){
        this.closed.emit(false);
    }
    
    onChanges(){
        this.newGroup.valueChanges.subscribe(val=>{
           this.nameExist=false; 
        })
      }
  }

