import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleHeaderComponent } from './module-header.component';

describe('ModuleHeaderComponent', () => {
  let component: ModuleHeaderComponent;
  let fixture: ComponentFixture<ModuleHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleHeaderComponent],
    });
    fixture = TestBed.createComponent(ModuleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
