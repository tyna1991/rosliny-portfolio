import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodatkoweInformacjeComponent } from './dodatkowe-informacje.component';

describe('DodatkoweInformacjeComponent', () => {
  let component: DodatkoweInformacjeComponent;
  let fixture: ComponentFixture<DodatkoweInformacjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodatkoweInformacjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodatkoweInformacjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
