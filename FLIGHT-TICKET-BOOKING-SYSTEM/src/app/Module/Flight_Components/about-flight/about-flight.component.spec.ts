import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFlightComponent } from './about-flight.component';

describe('AboutFlightComponent', () => {
  let component: AboutFlightComponent;
  let fixture: ComponentFixture<AboutFlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutFlightComponent]
    });
    fixture = TestBed.createComponent(AboutFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
