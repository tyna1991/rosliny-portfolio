import { Injectable } from '@angular/core';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})

export class ActiveLinkService {

  id:number;
  private currentId = new BehaviorSubject(1);
   currentIdObservable = this.currentId.asObservable();

   constructor() {
    }
    updateId(id: number) {
     this.id=id;
     this.currentId.next(id);
   }
}
