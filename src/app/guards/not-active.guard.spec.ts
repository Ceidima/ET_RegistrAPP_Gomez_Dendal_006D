import { TestBed } from '@angular/core/testing';

import { NotActiveGuard } from './not-active.guard';

describe('NotActiveGuard', () => {
  let guard: NotActiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotActiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
