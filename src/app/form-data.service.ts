import { Injectable } from '@angular/core';
import { Plants } from './plants';
import { Formdata, OpisOgolny, Pielegnacja, Wymagania, DodatkoweInformacje, Grupy } from './formdata.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import {Sample} from './color-picker.module';
import { sample } from 'rxjs-compat/operator/sample';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
 
    private formData: Formdata = new Formdata();
    private sample: Sample = new Sample();
    //private grupy: Grupy = new Grupy();
    private isOgolnyFormValid: boolean = false;
    private isWymaganiaFormValid: boolean = false;
    private isPielegnacjaFormValid: boolean = false;
    private isPDodatkoweFormValid: boolean = false;
    
    
    getSample() : Sample{
        var sample:Sample = {
            color:this.sample.color,
        }
        return sample;
    }
    setSample(color:string){
        this.sample.color = color;
    }
    resetSample(){
        this.sample.color=undefined;
    }
    // setGrupy(grupy:string[]) {
    //     this.grupy.nazwa=grupy;
    // }
    // getGrupy() : Grupy{
    //     return this.grupy;
    // }
    getOgolny(): OpisOgolny {
        // Return the Personal data
        var ogolny: OpisOgolny = {
            gatunek: this.formData.gatunek,
            odmiana: this.formData.odmiana,
            nazwaLacinska: this.formData.nazwaLacinska,
            wysokosc:this.formData.wysokosc,
            pokroj:this.formData.pokroj,
            kwitnienieOd:this.formData.kwitnienieOd,
            kwitnienieDo:this.formData.kwitnienieDo,
            kolorKwiatow:this.formData.kolorKwiatow,
            zdjecie:this.formData.zdjecie,
            id:this.formData.id,
        };
        return ogolny;
    }
     setOgolny(data: OpisOgolny) {
         // Update the Personal data only when the Personal Form had been validated successfully
         this.isOgolnyFormValid = true;
         this.formData.gatunek=data.gatunek,
         this.formData.odmiana=data.odmiana,
         this.formData.nazwaLacinska=data.nazwaLacinska,
         this.formData.wysokosc=data.wysokosc;
         this.formData.pokroj=data.pokroj;
         this.formData.kwitnienieOd=data.kwitnienieOd;
         this.formData.kwitnienieDo=data.kwitnienieDo;
         this.formData.kolorKwiatow=data.kolorKwiatow;
         this.formData.zdjecie=data.zdjecie;
         this.formData.id=data.id;
     }
    getWymagania() : Wymagania {
      var wymagania: Wymagania = {
        naslonecznienie:this.formData.naslonecznienie,
        gleba:this.formData.gleba,
        wilgotnosc:this.formData.wilgotnosc,
        phOd:this.formData.phOd,
        phDo:this.formData.phDo,
    };
    return wymagania;
    }
    
    setWymagania(data: Wymagania) {
        // Update the work type only when the Work Form had been validated successfully
        this.formData.naslonecznienie = data.naslonecznienie;
        this.formData.gleba = data.gleba;
        this.formData.wilgotnosc = data.wilgotnosc;
        this.formData.phOd= data.phOd;
        this.formData.phDo= data.phDo;
    }
 
    getPielegnacja() : Pielegnacja {
        // Return the Address data
        var pielegnacja: Pielegnacja = {
            zasilanie: this.formData.zasilanie,
            przycinanie: this.formData.przycinanie,
            inne: this.formData.inneP,
        };
        return pielegnacja;
    }
 
    setPielegnacja(data: Pielegnacja) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isPielegnacjaFormValid = true;
        this.formData.zasilanie = data.zasilanie;
        this.formData.przycinanie = data.przycinanie;
        this.formData.inneP = data.inne;
    }
 

    getDodatkowe() : DodatkoweInformacje {
      // Return the Address data
      var dodatkowe: DodatkoweInformacje = {
          grupa: this.formData.grupa,
          inne: this.formData.inneD,
      };
      return dodatkowe;
  }

  setDodatkowe(data: DodatkoweInformacje) {
      // Update the Address data only when the Address Form had been validated successfully
      this.isPDodatkoweFormValid = true;
      this.formData.grupa = data.grupa;
      this.formData.inneD = data.inne;
  }


    getFormData(): Formdata {
        // Return the entire Form Data
        return this.formData;
    }
 
    resetFormData(): Formdata {
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isOgolnyFormValid = false;
        return this.formData;
    }
 
    isFormOgolnyValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isOgolnyFormValid;
    }
    private FormValidationOgolny = new Subject();
    currentValidateOgolny = this.FormValidationOgolny.asObservable();
    checkValidateStateOgolny(isValid : boolean){
        this.FormValidationOgolny.next(isValid);
    }

    
    private FormValidationWymagania = new Subject();
    currentValidateWymagania = this.FormValidationWymagania.asObservable();
    checkValidateStateWymagania(isValid : boolean){
        this.FormValidationWymagania.next(isValid);
    }

    private groups = new Subject();
    currentGroups = this.groups.asObservable();
    checkGroups(groups : string[]){
        this.groups.next(groups);
    }
    
}

