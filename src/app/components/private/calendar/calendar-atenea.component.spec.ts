import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAteneaComponent } from './calendar-atenea.component';

describe('CalendarComponent', () => {
  let component: CalendarAteneaComponent;
  let fixture: ComponentFixture<CalendarAteneaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarAteneaComponent],
    });
    fixture = TestBed.createComponent(CalendarAteneaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
