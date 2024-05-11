import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorpousesComponent } from './porpouses.component';

describe('PorpousesComponent', () => {
  let component: PorpousesComponent;
  let fixture: ComponentFixture<PorpousesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorpousesComponent],
    });
    fixture = TestBed.createComponent(PorpousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
