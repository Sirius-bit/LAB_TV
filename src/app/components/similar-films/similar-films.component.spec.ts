import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarFilmsComponent } from './similar-films.component';

describe('SimilarFilmsComponent', () => {
  let component: SimilarFilmsComponent;
  let fixture: ComponentFixture<SimilarFilmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimilarFilmsComponent]
    });
    fixture = TestBed.createComponent(SimilarFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
