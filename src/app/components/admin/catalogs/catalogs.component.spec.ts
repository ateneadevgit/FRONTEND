import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsComponent } from './catalogs.component';

describe('CatalogsComponent', () => {
  let component: CatalogsComponent;
  let fixture: ComponentFixture<CatalogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogsComponent],
    });
    fixture = TestBed.createComponent(CatalogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
