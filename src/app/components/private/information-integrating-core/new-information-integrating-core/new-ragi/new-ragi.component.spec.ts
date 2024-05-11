import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRagiComponent } from './new-ragi.component';

describe('NewRagiComponent', () => {
  let component: NewRagiComponent;
  let fixture: ComponentFixture<NewRagiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewRagiComponent],
    });
    fixture = TestBed.createComponent(NewRagiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
