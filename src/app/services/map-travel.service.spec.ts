import { TestBed } from '@angular/core/testing';

import { MapTravelService } from './map-travel.service';

describe('MapTravelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapTravelService = TestBed.get(MapTravelService);
    expect(service).toBeTruthy();
  });
});
