import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpisOgolnyComponent } from './opis-ogolny.component';

describe('OpisOgolnyComponent', () => {
  let component: OpisOgolnyComponent;
  let fixture: ComponentFixture<OpisOgolnyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpisOgolnyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpisOgolnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
