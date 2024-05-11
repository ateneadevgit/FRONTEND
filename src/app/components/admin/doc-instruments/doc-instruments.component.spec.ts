import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocInstrumentsComponent } from './doc-instruments.component';

describe('DocInstrumentsComponent', () => {
  let component: DocInstrumentsComponent;
  let fixture: ComponentFixture<DocInstrumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocInstrumentsComponent],
    });
    fixture = TestBed.createComponent(DocInstrumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
