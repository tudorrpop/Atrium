import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpProfessorComponent } from './pop-up-professor.component';

describe('PopUpProfessorComponent', () => {
  let component: PopUpProfessorComponent;
  let fixture: ComponentFixture<PopUpProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpProfessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
