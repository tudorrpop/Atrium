import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationAdminComponent } from './authentication-admin.component';

describe('AuthenticationAdminComponent', () => {
  let component: AuthenticationAdminComponent;
  let fixture: ComponentFixture<AuthenticationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
