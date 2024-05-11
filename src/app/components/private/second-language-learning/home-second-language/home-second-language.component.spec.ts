import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSecondLanguageComponent } from './home-second-language.component';

describe('HomeSecondLanguageComponent', () => {
  let component: HomeSecondLanguageComponent;
  let fixture: ComponentFixture<HomeSecondLanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSecondLanguageComponent],
    });
    fixture = TestBed.createComponent(HomeSecondLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
