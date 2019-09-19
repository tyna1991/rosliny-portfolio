import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PielegnacjaComponent } from './pielegnacja.component';

describe('PielegnacjaComponent', () => {
  let component: PielegnacjaComponent;
  let fixture: ComponentFixture<PielegnacjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PielegnacjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PielegnacjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
