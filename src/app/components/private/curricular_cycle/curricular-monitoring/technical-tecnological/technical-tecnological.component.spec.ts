import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalTecnologicalComponent } from './technical-tecnological.component';

describe('TechnicalTecnologicalComponent', () => {
  let component: TechnicalTecnologicalComponent;
  let fixture: ComponentFixture<TechnicalTecnologicalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicalTecnologicalComponent],
    });
    fixture = TestBed.createComponent(TechnicalTecnologicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
