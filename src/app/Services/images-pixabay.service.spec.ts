import { TestBed } from '@angular/core/testing';

import { ImagesPixabayService } from './images-pixabay.service';

describe('ImagesPixabayService', () => {
  let service: ImagesPixabayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesPixabayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
