import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlantComponent } from './single-plant.component';

describe('SinglePlantComponent', () => {
  let component: SinglePlantComponent;
  let fixture: ComponentFixture<SinglePlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
