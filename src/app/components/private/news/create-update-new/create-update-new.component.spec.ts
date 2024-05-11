import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateNewComponent } from './create-update-new.component';

describe('CreateUpdateNewComponent', () => {
  let component: CreateUpdateNewComponent;
  let fixture: ComponentFixture<CreateUpdateNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateNewComponent],
    });
    fixture = TestBed.createComponent(CreateUpdateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
