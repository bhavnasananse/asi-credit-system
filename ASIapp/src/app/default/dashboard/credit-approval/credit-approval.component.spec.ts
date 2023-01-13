import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditApprovalComponent } from './credit-approval.component';

describe('CreditApprovalComponent', () => {
  let component: CreditApprovalComponent;
  let fixture: ComponentFixture<CreditApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
