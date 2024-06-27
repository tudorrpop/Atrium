import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAllocateStudentsComponent } from './pop-up-allocate-students.component';

describe('PopUpAllocateStudentsComponent', () => {
  let component: PopUpAllocateStudentsComponent;
  let fixture: ComponentFixture<PopUpAllocateStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpAllocateStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpAllocateStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
