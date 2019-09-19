import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../node_modules/rxjs';
import { Plants } from './plants';
import { Observable } from 'rxjs/Observable'

@Injectable()

export class PlantsService {
  public plantslist: Plants[]=[];
  private listPlantsObs = new BehaviorSubject<Plants[]>(this.plantslist);
  constructor() { }
  add(plant:Plants[])
  {
    plant[0].isAdded=true;
    this.plantslist.push(plant[0]);
    this.listPlantsObs.next(this.plantslist);
  }
  getlistPlantsObs(): Observable<Plants[]>
  {
    let list=this.listPlantsObs.getValue().filter(e=>e.isAdded==true);
    this.listPlantsObs.next(list);
    return this.listPlantsObs.asObservable();
  }
  remove(plant:Plants)
  {
    plant.isAdded=false;
    //const list = this.listPlantsObs.getValue();
    //this.listPlantsObs.next(list);
    //this.plantslist.pop();
    const list2 = this.listPlantsObs.getValue();//.filter(e=>e.isAdded==true);
    list2.forEach((item, index)=>{if(item===plant){list2.splice(index,1);}});
    this.listPlantsObs.next(list2);

    //removeRoomArr(data: any) {
    //  let roomArr: any[] = this.roomArr_source.getValue();
    //  roomArr.forEach((item, index) => {
    //      if(item === data) { roomArr.splice(index, 1); }
    //  });
    //  this.roomArr_source.next(roomArr);
  }
  }

