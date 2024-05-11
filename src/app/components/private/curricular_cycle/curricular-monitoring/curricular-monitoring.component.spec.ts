import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurricularMonitoringComponent } from './curricular-monitoring.component';

describe('CurricularMonitoringComponent', () => {
  let component: CurricularMonitoringComponent;
  let fixture: ComponentFixture<CurricularMonitoringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurricularMonitoringComponent],
    });
    fixture = TestBed.createComponent(CurricularMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
