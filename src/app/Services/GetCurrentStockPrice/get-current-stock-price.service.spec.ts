import { TestBed, inject } from '@angular/core/testing';

import { GetCurrentStockPriceService } from './get-current-stock-price.service';

describe('GetCurrentStockPriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCurrentStockPriceService]
    });
  });

  it('should be created', inject([GetCurrentStockPriceService], (service: GetCurrentStockPriceService) => {
    expect(service).toBeTruthy();
  }));
});
