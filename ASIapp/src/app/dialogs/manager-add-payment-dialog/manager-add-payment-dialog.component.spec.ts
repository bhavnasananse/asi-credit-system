import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAddPaymentDialogComponent } from './manager-add-payment-dialog.component';

describe('ManagerAddPaymentDialogComponent', () => {
  let component: ManagerAddPaymentDialogComponent;
  let fixture: ComponentFixture<ManagerAddPaymentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerAddPaymentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAddPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
