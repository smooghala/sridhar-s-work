import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeCastGridComponent } from './fore-cast-grid.component';

describe('ForeCastGridComponent', () => {
  let component: ForeCastGridComponent;
  let fixture: ComponentFixture<ForeCastGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeCastGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeCastGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
