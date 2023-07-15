import { TestBed } from '@angular/core/testing';

import { BuyFilmService } from './buy-film.service';

describe('BuyFilmService', () => {
  let service: BuyFilmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyFilmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
