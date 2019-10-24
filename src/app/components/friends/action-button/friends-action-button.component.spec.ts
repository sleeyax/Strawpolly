import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsActionButtonComponent } from './friends-action-button.component';

describe('FriendsActionButtonComponent', () => {
  let component: FriendsActionButtonComponent;
  let fixture: ComponentFixture<FriendsActionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsActionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
