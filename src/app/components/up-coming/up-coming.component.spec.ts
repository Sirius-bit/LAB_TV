import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpComingComponent } from './up-coming.component';

describe('UpComingComponent', () => {
  let component: UpComingComponent;
  let fixture: ComponentFixture<UpComingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpComingComponent]
    });
    fixture = TestBed.createComponent(UpComingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
