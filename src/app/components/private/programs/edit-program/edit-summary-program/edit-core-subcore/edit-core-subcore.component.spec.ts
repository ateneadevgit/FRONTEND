import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoreSubcoreComponent } from './edit-core-subcore.component';

describe('EditCoreSubcoreComponent', () => {
  let component: EditCoreSubcoreComponent;
  let fixture: ComponentFixture<EditCoreSubcoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCoreSubcoreComponent],
    });
    fixture = TestBed.createComponent(EditCoreSubcoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
