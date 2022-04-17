import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyIconComponent } from './copy-icon.component';

describe('CopyIconComponent', () => {
  let component: CopyIconComponent;
  let fixture: ComponentFixture<CopyIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
