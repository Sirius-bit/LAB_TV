import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedMovieComponent } from './searched-movie.component';

describe('SearchedMovieComponent', () => {
  let component: SearchedMovieComponent;
  let fixture: ComponentFixture<SearchedMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchedMovieComponent]
    });
    fixture = TestBed.createComponent(SearchedMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
