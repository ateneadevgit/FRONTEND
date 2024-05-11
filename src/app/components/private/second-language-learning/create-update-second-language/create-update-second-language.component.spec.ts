import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSecondLanguageComponent } from './create-update-second-language.component';

describe('CreateUpdateSecondLanguageComponent', () => {
  let component: CreateUpdateSecondLanguageComponent;
  let fixture: ComponentFixture<CreateUpdateSecondLanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateSecondLanguageComponent],
    });
    fixture = TestBed.createComponent(CreateUpdateSecondLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
