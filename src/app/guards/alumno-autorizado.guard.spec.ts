import { TestBed } from '@angular/core/testing';

import { AlumnoAutorizadoGuard } from './alumno-autorizado.guard';

describe('AlumnoAutorizadoGuard', () => {
  let guard: AlumnoAutorizadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlumnoAutorizadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
