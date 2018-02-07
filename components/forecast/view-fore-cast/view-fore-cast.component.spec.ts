import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewForeCastComponent } from './view-fore-cast.component';

describe('ViewForeCastComponent', () => {
  let component: ViewForeCastComponent;
  let fixture: ComponentFixture<ViewForeCastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewForeCastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewForeCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
