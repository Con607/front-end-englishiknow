import { TestBed, inject } from '@angular/core/testing';

import { ContTransSentenceSpanishService } from './cont-trans-sentence-spanish.service';

describe('ContTransSentenceSpanishService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContTransSentenceSpanishService]
    });
  });

  it('should be created', inject([ContTransSentenceSpanishService], (service: ContTransSentenceSpanishService) => {
    expect(service).toBeTruthy();
  }));
});
