import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFlightDetailsComponent } from './display-flight-details.component';

describe('DisplayFlightDetailsComponent', () => {
  let component: DisplayFlightDetailsComponent;
  let fixture: ComponentFixture<DisplayFlightDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayFlightDetailsComponent]
    });
    fixture = TestBed.createComponent(DisplayFlightDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
