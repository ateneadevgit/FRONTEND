import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCatalogComponent } from './create-catalog.component';

describe('CreateCatalogComponent', () => {
  let component: CreateCatalogComponent;
  let fixture: ComponentFixture<CreateCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCatalogComponent],
    });
    fixture = TestBed.createComponent(CreateCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
