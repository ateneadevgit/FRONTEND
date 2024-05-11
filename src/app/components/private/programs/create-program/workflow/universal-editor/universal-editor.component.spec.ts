import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalEditorComponent } from './universal-editor.component';

describe('UniversalEditorComponent', () => {
  let component: UniversalEditorComponent;
  let fixture: ComponentFixture<UniversalEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversalEditorComponent],
    });
    fixture = TestBed.createComponent(UniversalEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
