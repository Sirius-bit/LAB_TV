import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedFilmsResultComponent } from './searched-films-result.component';

describe('SearchedFilmsResultComponent', () => {
  let component: SearchedFilmsResultComponent;
  let fixture: ComponentFixture<SearchedFilmsResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchedFilmsResultComponent]
    });
    fixture = TestBed.createComponent(SearchedFilmsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
