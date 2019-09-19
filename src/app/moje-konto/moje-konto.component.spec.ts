import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeKontoComponent } from './moje-konto.component';

describe('MojeKontoComponent', () => {
  let component: MojeKontoComponent;
  let fixture: ComponentFixture<MojeKontoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MojeKontoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MojeKontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
