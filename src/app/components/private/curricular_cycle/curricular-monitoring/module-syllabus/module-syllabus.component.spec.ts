import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSyllabusComponent } from './module-syllabus.component';

describe('ModuleSyllabusComponent', () => {
  let component: ModuleSyllabusComponent;
  let fixture: ComponentFixture<ModuleSyllabusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleSyllabusComponent],
    });
    fixture = TestBed.createComponent(ModuleSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
