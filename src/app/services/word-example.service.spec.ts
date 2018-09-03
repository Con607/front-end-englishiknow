import { TestBed, inject } from '@angular/core/testing';

import { WordExampleService } from './word-example.service';

describe('WordExampleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordExampleService]
    });
  });

  it('should be created', inject([WordExampleService], (service: WordExampleService) => {
    expect(service).toBeTruthy();
  }));
});
