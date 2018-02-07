import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownTreeComponent } from './drop-down-tree.component';

describe('DropDownTreeComponent', () => {
  let component: DropDownTreeComponent;
  let fixture: ComponentFixture<DropDownTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
