import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCurricularOutputComponent } from './edit-curricular-output.component';

describe('EditCurricularOutputComponent', () => {
  let component: EditCurricularOutputComponent;
  let fixture: ComponentFixture<EditCurricularOutputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCurricularOutputComponent],
    });
    fixture = TestBed.createComponent(EditCurricularOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
