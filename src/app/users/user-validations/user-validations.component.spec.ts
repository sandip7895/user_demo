import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserValidationsComponent } from './user-validations.component';

describe('UserValidationsComponent', () => {
  let component: UserValidationsComponent;
  let fixture: ComponentFixture<UserValidationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserValidationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
