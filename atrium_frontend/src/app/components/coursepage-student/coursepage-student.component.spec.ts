import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursepageStudentComponent } from './coursepage-student.component';

describe('CoursepageStudentComponent', () => {
  let component: CoursepageStudentComponent;
  let fixture: ComponentFixture<CoursepageStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursepageStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursepageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
