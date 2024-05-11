import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EportafolioComponent } from './eportafolio.component';

describe('EportafolioComponent', () => {
  let component: EportafolioComponent;
  let fixture: ComponentFixture<EportafolioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EportafolioComponent],
    });
    fixture = TestBed.createComponent(EportafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
