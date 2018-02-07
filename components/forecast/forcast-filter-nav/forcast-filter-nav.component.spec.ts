import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcastFilterNavComponent } from './forcast-filter-nav.component';

describe('ForcastFilterNavComponent', () => {
  let component: ForcastFilterNavComponent;
  let fixture: ComponentFixture<ForcastFilterNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForcastFilterNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcastFilterNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
