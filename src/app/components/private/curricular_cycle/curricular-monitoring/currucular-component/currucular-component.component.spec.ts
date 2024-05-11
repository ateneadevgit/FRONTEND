import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrucularComponentComponent } from './currucular-component.component';

describe('CurrucularComponentComponent', () => {
  let component: CurrucularComponentComponent;
  let fixture: ComponentFixture<CurrucularComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrucularComponentComponent],
    });
    fixture = TestBed.createComponent(CurrucularComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
