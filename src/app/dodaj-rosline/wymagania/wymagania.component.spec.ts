import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WymaganiaComponent } from './wymagania.component';

describe('WymaganiaComponent', () => {
  let component: WymaganiaComponent;
  let fixture: ComponentFixture<WymaganiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WymaganiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WymaganiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
