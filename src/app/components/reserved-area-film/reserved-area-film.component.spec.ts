import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedAreaFilmComponent } from './reserved-area-film.component';

describe('ReservedAreaFilmComponent', () => {
  let component: ReservedAreaFilmComponent;
  let fixture: ComponentFixture<ReservedAreaFilmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservedAreaFilmComponent]
    });
    fixture = TestBed.createComponent(ReservedAreaFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
