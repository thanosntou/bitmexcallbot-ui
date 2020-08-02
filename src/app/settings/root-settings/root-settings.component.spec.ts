import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootSettingsComponent } from './root-settings.component';

describe('RootSettingsComponent', () => {
  let component: RootSettingsComponent;
  let fixture: ComponentFixture<RootSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
