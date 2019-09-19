import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WylogujComponent } from './wyloguj.component';

describe('WylogujComponent', () => {
  let component: WylogujComponent;
  let fixture: ComponentFixture<WylogujComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WylogujComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WylogujComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
