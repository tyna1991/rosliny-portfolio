import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {ColorPicker, defaultColors} from './../color-picker.module';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {

  constructor() { }
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
        label: 'żółty',
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
  
  ngOnInit() {
    console.log(this.heading);
  }
  
  @Input() heading: string;
  @Input() color: string;
  @Output() eventH = new EventEmitter();
  @Output() eventC = new EventEmitter();
  public show = false;
  public toggleColors() {
    this.show = !this.show;
  }

  public changeColor(color: any) {
    this.color = color.hex;
    this.heading=color.label;
    this.eventC.emit(this.color); // Return color
    this.eventH.emit(this.heading); // Return heading
    
    this.show = false;
  }
}
