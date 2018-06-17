import { TestBed, inject } from '@angular/core/testing';

import { GetKeyStatsServiceService } from './get-key-stats-service.service';

describe('GetKeyStatsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetKeyStatsServiceService]
    });
  });

  it('should be created', inject([GetKeyStatsServiceService], (service: GetKeyStatsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
