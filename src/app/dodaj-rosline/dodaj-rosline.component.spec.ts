import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajRoslineComponent } from './dodaj-rosline.component';

describe('DodajRoslineComponent', () => {
  let component: DodajRoslineComponent;
  let fixture: ComponentFixture<DodajRoslineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajRoslineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajRoslineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
