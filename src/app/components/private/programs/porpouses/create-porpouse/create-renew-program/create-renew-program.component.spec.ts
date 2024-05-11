import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRenewProgramComponent } from './create-renew-program.component';

describe('CreateRenewProgramComponent', () => {
  let component: CreateRenewProgramComponent;
  let fixture: ComponentFixture<CreateRenewProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRenewProgramComponent],
    });
    fixture = TestBed.createComponent(CreateRenewProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
