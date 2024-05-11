import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNifsComponent } from './view-nifs.component';

describe('ViewNifsComponent', () => {
  let component: ViewNifsComponent;
  let fixture: ComponentFixture<ViewNifsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNifsComponent],
    });
    fixture = TestBed.createComponent(ViewNifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
