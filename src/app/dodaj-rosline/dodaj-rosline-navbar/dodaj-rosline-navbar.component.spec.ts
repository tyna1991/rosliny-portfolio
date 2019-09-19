import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajRoslineNavbarComponent } from './dodaj-rosline-navbar.component';

describe('DodajRoslineNavbarComponent', () => {
  let component: DodajRoslineNavbarComponent;
  let fixture: ComponentFixture<DodajRoslineNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajRoslineNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajRoslineNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
