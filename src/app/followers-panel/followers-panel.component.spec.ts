import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersPanelComponent } from './followers-panel.component';

describe('FollowersPanelComponent', () => {
  let component: FollowersPanelComponent;
  let fixture: ComponentFixture<FollowersPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowersPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
