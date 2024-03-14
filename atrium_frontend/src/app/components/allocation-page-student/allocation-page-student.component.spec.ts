import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationPageStudentComponent } from './allocation-page-student.component';

describe('AllocationPageStudentComponent', () => {
  let component: AllocationPageStudentComponent;
  let fixture: ComponentFixture<AllocationPageStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationPageStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocationPageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
