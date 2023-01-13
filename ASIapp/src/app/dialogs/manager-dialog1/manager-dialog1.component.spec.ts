import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDialog1Component } from './manager-dialog1.component';

describe('ManagerDialog1Component', () => {
  let component: ManagerDialog1Component;
  let fixture: ComponentFixture<ManagerDialog1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerDialog1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerDialog1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
