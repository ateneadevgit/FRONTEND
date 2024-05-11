import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventPersonComponent } from './create-event-person.component';

describe('CreateEventPersonComponent', () => {
  let component: CreateEventPersonComponent;
  let fixture: ComponentFixture<CreateEventPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEventPersonComponent],
    });
    fixture = TestBed.createComponent(CreateEventPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
