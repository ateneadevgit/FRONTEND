import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationIntegratingCoreComponent } from './information-integrating-core.component';

describe('InformationIntegratingCoreComponent', () => {
  let component: InformationIntegratingCoreComponent;
  let fixture: ComponentFixture<InformationIntegratingCoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationIntegratingCoreComponent],
    });
    fixture = TestBed.createComponent(InformationIntegratingCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
