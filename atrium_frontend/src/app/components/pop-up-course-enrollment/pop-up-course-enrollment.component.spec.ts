import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCourseEnrollmentComponent } from './pop-up-course-enrollment.component';

describe('PopUpCourseEnrollmentComponent', () => {
  let component: PopUpCourseEnrollmentComponent;
  let fixture: ComponentFixture<PopUpCourseEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpCourseEnrollmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpCourseEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
