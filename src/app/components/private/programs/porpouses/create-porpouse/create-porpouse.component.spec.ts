import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePorpouseComponent } from './create-porpouse.component';

describe('CreatePorpouseComponent', () => {
  let component: CreatePorpouseComponent;
  let fixture: ComponentFixture<CreatePorpouseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePorpouseComponent],
    });
    fixture = TestBed.createComponent(CreatePorpouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
