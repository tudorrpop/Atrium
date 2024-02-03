import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCourseDeleteComponent } from './pop-up-course-delete.component';

describe('PopUpCourseDeleteComponent', () => {
  let component: PopUpCourseDeleteComponent;
  let fixture: ComponentFixture<PopUpCourseDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpCourseDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpCourseDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
