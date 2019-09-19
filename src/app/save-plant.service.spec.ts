import { TestBed, inject } from '@angular/core/testing';

import { SavePlantService } from './save-plant.service';

describe('SavePlantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavePlantService]
    });
  });

  it('should be created', inject([SavePlantService], (service: SavePlantService) => {
    expect(service).toBeTruthy();
  }));
});
