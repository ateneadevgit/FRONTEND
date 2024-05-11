import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInformationIntegratingComponent } from './home-information-integrating.component';

describe('HomeInformationIntegratingComponent', () => {
  let component: HomeInformationIntegratingComponent;
  let fixture: ComponentFixture<HomeInformationIntegratingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeInformationIntegratingComponent],
    });
    fixture = TestBed.createComponent(HomeInformationIntegratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
