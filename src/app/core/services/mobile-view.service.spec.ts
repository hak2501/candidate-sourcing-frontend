import { TestBed } from '@angular/core/testing';

import { ResponsiveViewService } from './responsive-view.service';

describe('ResponsiveViewService', () => {
  let service: ResponsiveViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsiveViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
