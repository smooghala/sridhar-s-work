import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioDropDownComponent } from './scenario-drop-down.component';

describe('ScenarioDropDownComponent', () => {
  let component: ScenarioDropDownComponent;
  let fixture: ComponentFixture<ScenarioDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
