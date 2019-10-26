import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestFieldComponent } from './friend-request-field.component';

describe('FriendRequestFieldComponent', () => {
  let component: FriendRequestFieldComponent;
  let fixture: ComponentFixture<FriendRequestFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendRequestFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendRequestFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
