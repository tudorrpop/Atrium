import { TestBed } from '@angular/core/testing';

import { MsalGuard } from './msal.guard';

describe('MsalguardGuard', () => {
  let guard: MsalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MsalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
