import { TestBed, async, inject } from '@angular/core/testing';

import { SignInGuardGuard } from './sign-in-guard.guard';

describe('SignInGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignInGuardGuard]
    });
  });

  it('should ...', inject([SignInGuardGuard], (guard: SignInGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
