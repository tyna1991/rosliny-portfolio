import { Component, OnInit, Input } from '@angular/core';
import { FormDataService }   from '../form-data.service';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { SavePlantService } from '../save-plant.service';
import { OpisOgolny, Formdata, Pielegnacja, DodatkoweInformacje, Wymagania, } from '../formdata.model';
import {ColorPicker, defaultColors} from './../color-picker.module';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-dodaj-rosline',
  templateUrl: './dodaj-rosline.component.html',
  styleUrls: ['./dodaj-rosline.component.css']
})
export class DodajRoslineComponent implements OnInit {

  title = 'Multi-Step Wizard';
    @Input() formData;
    plant:Formdata;
    public colorValues:ColorPicker={
      colors:[
        {
          label: '',
            hex:''
        },
        {
          label: 'biały',
            hex:'#fff',
        },
        {
          label: 'zółty',
            hex:'#ffeb3b'
        },
          {
          label: 'zielony',
            hex:'#4caf50'
        },
        {
         label: 'niebieski',
         hex: '#2196f3'
       },
      {
         label: 'czarny',
         hex: '#000'
       },
       {label: 'pomarańczowy',
          hex: '#ff9800'
        },
         {
          label: 'czerwony',
          hex: '#f44336'
        },
        {
          label: 'fioletowy',
          hex: '#673ab7'
        },
      
      {
          label: 'różowy',
          hex: '#e91e63'
        },
        {
         label: 'brązowy',
         hex: '#795548'
       }
        ]
      };
   constructor(private savePlantService:SavePlantService, private formDataService: FormDataService, private activeRoute:ActivatedRoute, private router: Router) {
     this.activeRoute.params.subscribe(params => {
      let id=params.id;
      if(id!=undefined){
        this.loadPlant(id);
      }
    });
    this.activeRoute.url.subscribe(url =>{
      console.log(url[0].path);
      if(url[0].path!='edit'){
        this.plant = this.formDataService.resetFormData();
        this.formDataService.resetSample();
      }
    });
    }
    onRouterOutletDeactivate(event:any){
     event.tabClick(event);
    }
    ngOnInit() {
      this.formData = this.formDataService.getFormData();
    }
    loadPlant(id:string){
      this.plant =  this.savePlantService.getPlant(id);
      this.colorValues.colors.forEach(elem=>{if(elem.label==this.plant[0].kolorKwiatow){
        this.formDataService.setSample(elem.hex);
      }})
      var opisOgolny:OpisOgolny={
        gatunek: this.plant[0].gatunek,
        odmiana: this.plant[0].odmiana,
        nazwaLacinska: this.plant[0].nazwaLacinska,
        kwitnienieOd: this.plant[0].kwitnienieOd,
        kwitnienieDo: this.plant[0].kwitnienieDo,
        kolorKwiatow: this.plant[0].kolorKwiatow,
        wysokosc: this.plant[0].wysokosc,
        pokroj: this.plant[0].pokroj,
        zdjecie: this.plant[0].zdjecie,
        id: this.plant[0].id,
      }

      this.formDataService.setOgolny(opisOgolny);
      var wymagania:Wymagania={
        naslonecznienie: this.plant[0].naslonecznienie,
        gleba: this.plant[0].gleba,
        wilgotnosc: this.plant[0].wilgotnosc,
        phOd: this.plant[0].phOd,
        phDo: this.plant[0].phDo,
      }
      this.formDataService.setWymagania(wymagania);
      var pielegnacja:Pielegnacja={
        zasilanie: this.plant[0].zasilanie,
        przycinanie: this.plant[0].przycinanie,
        inne: this.plant[0].inne,
      }
      this.formDataService.setPielegnacja(pielegnacja);
      var dodatkoweInformacje:DodatkoweInformacje={
        grupa: this.plant[0].grupa,
        inne: this.plant[0].inne,
      }
      this.formDataService.setDodatkowe(dodatkoweInformacje);
      }
}
