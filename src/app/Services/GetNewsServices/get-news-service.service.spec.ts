import { TestBed, inject } from '@angular/core/testing';

import { GetNewsServiceService } from './get-news-service.service';

describe('GetNewsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetNewsServiceService]
    });
  });

  it('should be created', inject([GetNewsServiceService], (service: GetNewsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
