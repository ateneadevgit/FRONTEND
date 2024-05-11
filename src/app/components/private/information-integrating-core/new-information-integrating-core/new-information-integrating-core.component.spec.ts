import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInformationIntegratingCoreComponent } from './new-information-integrating-core.component';

describe('NewInformationIntegratingCoreComponent', () => {
  let component: NewInformationIntegratingCoreComponent;
  let fixture: ComponentFixture<NewInformationIntegratingCoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewInformationIntegratingCoreComponent],
    });
    fixture = TestBed.createComponent(NewInformationIntegratingCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
