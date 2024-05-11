import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCurricularComponentsComponent } from './edit-curricular-components.component';

describe('EditCurricularComponentsComponent', () => {
  let component: EditCurricularComponentsComponent;
  let fixture: ComponentFixture<EditCurricularComponentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCurricularComponentsComponent],
    });
    fixture = TestBed.createComponent(EditCurricularComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
