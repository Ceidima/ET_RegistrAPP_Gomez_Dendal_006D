import { TestBed } from '@angular/core/testing';

import { ProfAutorizadoGuard } from './prof-autorizado.guard';

describe('ProfAutorizadoGuard', () => {
  let guard: ProfAutorizadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfAutorizadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
