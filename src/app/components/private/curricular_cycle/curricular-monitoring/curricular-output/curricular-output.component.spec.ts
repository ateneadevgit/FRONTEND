import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurricularOutputComponent } from './curricular-output.component';

describe('CurricularOutputComponent', () => {
  let component: CurricularOutputComponent;
  let fixture: ComponentFixture<CurricularOutputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurricularOutputComponent],
    });
    fixture = TestBed.createComponent(CurricularOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
