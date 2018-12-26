import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowPanelComponent } from './follow-panel.component';

describe('FollowPanelComponent', () => {
  let component: FollowPanelComponent;
  let fixture: ComponentFixture<FollowPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
