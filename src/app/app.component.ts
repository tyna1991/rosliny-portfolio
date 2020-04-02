import { Component, ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
  <nav class="navbar navbar-expand-lg sticky-top navbar-light">
<div class="container">
    <a class="navbar-brand" routerLink="/"><img height="45px" src="../../assets/images/logo.png"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <app-search style="width:100%"></app-search>
    <div class="collapse navbar-collapse" id="navbarSupportedContent" #navbarSupportedContent>
      <ul class="navbar-nav ml-auto">
      <li class="nav-item">
          <a class="nav-link" (click)="removeShow()" routerLink="/dodaj-rosline/" routerLinkActive="active-link" [routerLinkActiveOptions]={exact:true}>dodaj roślinę</a>
         </li>
        <li class="nav-item">
          <a class="nav-link" (click)="removeShow()" routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]={exact:true}>katalog</a>
         </li>
      </ul>
    </div>
</div>
  </nav>
  <router-outlet></router-outlet>
  <footer>
  <div class="footer-background"></div>
  </footer>
`,
  styleUrls: ['./app.component.css'
]
})
export class AppComponent {
  title='Zielonomi';
  @ViewChild('navbarSupportedContent') menu : ElementRef;
removeShow(){
  this.menu.nativeElement.classList.remove("show");
}
}
