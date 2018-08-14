import { TestBed, inject } from '@angular/core/testing';

import { ContTransSentenceEnglishService } from './cont-trans-sentence-english.service';

describe('ContTransSentenceEnglishService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContTransSentenceEnglishService]
    });
  });

  it('should be created', inject([ContTransSentenceEnglishService], (service: ContTransSentenceEnglishService) => {
    expect(service).toBeTruthy();
  }));
});
