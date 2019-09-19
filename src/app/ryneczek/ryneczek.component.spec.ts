import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RyneczekComponent } from './ryneczek.component';

describe('RyneczekComponent', () => {
  let component: RyneczekComponent;
  let fixture: ComponentFixture<RyneczekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RyneczekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RyneczekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
