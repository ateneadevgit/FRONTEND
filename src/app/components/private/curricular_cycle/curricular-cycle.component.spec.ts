import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurricularCycleComponent } from './curricular-cycle.component';

describe('CurricularCycleComponent', () => {
  let component: CurricularCycleComponent;
  let fixture: ComponentFixture<CurricularCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurricularCycleComponent],
    });
    fixture = TestBed.createComponent(CurricularCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
