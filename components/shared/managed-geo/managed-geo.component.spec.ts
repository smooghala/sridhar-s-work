import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedGeoComponent } from './managed-geo.component';

describe('ManagedGeoComponent', () => {
  let component: ManagedGeoComponent;
  let fixture: ComponentFixture<ManagedGeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedGeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
