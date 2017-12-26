import { TestBed, inject } from '@angular/core/testing';

import { CanvaServiceService } from './canva-service.service';

describe('CanvaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanvaServiceService]
    });
  });

  it('should be created', inject([CanvaServiceService], (service: CanvaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
