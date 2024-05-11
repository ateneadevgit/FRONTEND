import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecificSummaryComponent } from './specific-summary.component';

describe('FundamentalHistoricComponent', () => {
  let component: SpecificSummaryComponent;
  let fixture: ComponentFixture<SpecificSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificSummaryComponent],
    });
    fixture = TestBed.createComponent(SpecificSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
