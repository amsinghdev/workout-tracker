import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceTargetModalComponent } from './performance-target-modal.component';

describe('PerformanceTargetModalComponent', () => {
  let component: PerformanceTargetModalComponent;
  let fixture: ComponentFixture<PerformanceTargetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceTargetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceTargetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
