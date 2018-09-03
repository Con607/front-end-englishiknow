import { TestBed, inject } from '@angular/core/testing';

import { WordListService } from './word-list.service';

describe('WordListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordListService]
    });
  });

  it('should be created', inject([WordListService], (service: WordListService) => {
    expect(service).toBeTruthy();
  }));
});
