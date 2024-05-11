import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreSubcoresComponent } from './core-subcores.component';

describe('CoreSubcoresComponent', () => {
  let component: CoreSubcoresComponent;
  let fixture: ComponentFixture<CoreSubcoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoreSubcoresComponent],
    });
    fixture = TestBed.createComponent(CoreSubcoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
