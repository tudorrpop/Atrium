import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpChoiceChangesComponent } from './pop-up-choice-changes.component';

describe('PopUpChoiceChangesComponent', () => {
  let component: PopUpChoiceChangesComponent;
  let fixture: ComponentFixture<PopUpChoiceChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpChoiceChangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpChoiceChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
