import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditDialog1Component } from './credit-dialog1.component';

describe('CreditDialog1Component', () => {
  let component: CreditDialog1Component;
  let fixture: ComponentFixture<CreditDialog1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditDialog1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditDialog1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
