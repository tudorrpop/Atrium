import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursepageProfessorComponent } from './coursepage-professor.component';

describe('CoursepageProfessorComponent', () => {
  let component: CoursepageProfessorComponent;
  let fixture: ComponentFixture<CoursepageProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursepageProfessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursepageProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
