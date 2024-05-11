import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActiveEditComponent } from './dialog-active-edit.component';

describe('DialogActiveEditComponent', () => {
  let component: DialogActiveEditComponent;
  let fixture: ComponentFixture<DialogActiveEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogActiveEditComponent],
    });
    fixture = TestBed.createComponent(DialogActiveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
