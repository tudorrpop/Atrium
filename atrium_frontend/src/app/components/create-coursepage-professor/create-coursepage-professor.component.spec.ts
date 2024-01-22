import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoursepageProfessorComponent } from './create-coursepage-professor.component';

describe('CreateCoursepageProfessorComponent', () => {
  let component: CreateCoursepageProfessorComponent;
  let fixture: ComponentFixture<CreateCoursepageProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCoursepageProfessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCoursepageProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
