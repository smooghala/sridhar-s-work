import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffliatesDropDownComponent } from './affliates-drop-down.component';

describe('AffliatesDropDownComponent', () => {
  let component: AffliatesDropDownComponent;
  let fixture: ComponentFixture<AffliatesDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffliatesDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffliatesDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
