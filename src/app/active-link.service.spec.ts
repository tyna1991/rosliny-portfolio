import { TestBed, inject } from '@angular/core/testing';

import { ActiveLinkService } from './active-link.service';

describe('ActiveLinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveLinkService]
    });
  });

  it('should be created', inject([ActiveLinkService], (service: ActiveLinkService) => {
    expect(service).toBeTruthy();
  }));
});
