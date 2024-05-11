import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewNewComponent } from './view-new.component';

describe('ViewNewComponent', () => {
  let component: ViewNewComponent;
  let fixture: ComponentFixture<ViewNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNewComponent],
    });
    fixture = TestBed.createComponent(ViewNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
