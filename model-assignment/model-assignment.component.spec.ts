import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAssignmentComponent } from './model-assignment.component';

describe('ModelAssignmentComponent', () => {
  let component: ModelAssignmentComponent;
  let fixture: ComponentFixture<ModelAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
