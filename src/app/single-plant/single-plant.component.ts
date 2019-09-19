import { Component, OnInit } from '@angular/core';
import { SavePlantService } from '../save-plant.service';
import { Formdata, Grupy } from '../formdata.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-single-plant',
  templateUrl: './single-plant.component.html',
  styleUrls: ['./single-plant.component.css']
})
export class SinglePlantComponent implements OnInit {

  constructor(private router:Router, private activeRoute:ActivatedRoute, private savePlantService: SavePlantService) { 
    this.activeRoute.queryParams.subscribe(queryParams => {
      // do something with the query params
    });
    this.activeRoute.params.subscribe(routeParams => {
      this.loadPlantDetalis(routeParams.id);
    });
  }
plant:Formdata;
  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.plant = this.savePlantService.getPlant(id);
  }
  loadPlantDetalis(id:string){
    this.plant = this.savePlantService.getPlant(id);
  }
  edit(){
    //this.savePlantService.getPlant(this.plant[0].id);
    this.router.navigateByUrl('/edit/'+this.plant[0].id+'/opis-ogolny');
  }

}
