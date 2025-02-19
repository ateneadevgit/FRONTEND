import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsWidgetComponent } from './news-widget.component';

describe('NewsWidgetComponent', () => {
  let component: NewsWidgetComponent;
  let fixture: ComponentFixture<NewsWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsWidgetComponent],
    });
    fixture = TestBed.createComponent(NewsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
