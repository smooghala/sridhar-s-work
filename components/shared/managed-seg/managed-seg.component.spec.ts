import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedSegComponent } from './managed-seg.component';

describe('ManagedSegComponent', () => {
  let component: ManagedSegComponent;
  let fixture: ComponentFixture<ManagedSegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedSegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedSegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
