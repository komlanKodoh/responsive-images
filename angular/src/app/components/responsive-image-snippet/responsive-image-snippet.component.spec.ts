import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveImageSnippetComponent } from './responsive-image-snippet.component';

describe('ResponsiveImageSnippetComponent', () => {
  let component: ResponsiveImageSnippetComponent;
  let fixture: ComponentFixture<ResponsiveImageSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsiveImageSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveImageSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
