import { TestBed } from '@angular/core/testing';

import { VariablesComponentService } from './variables-component.service';

describe('VariablesComponentService', () => {
  let service: VariablesComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariablesComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
