import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpSlotComponent } from './pop-up-slot.component';

describe('PopUpSlotComponent', () => {
  let component: PopUpSlotComponent;
  let fixture: ComponentFixture<PopUpSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpSlotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
