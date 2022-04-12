import { TestBed } from '@angular/core/testing';

import { ImageOptimizerService } from './image-optimizer.service';

describe('ImageOptimiserService', () => {
  let service: ImageOptimizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageOptimizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
