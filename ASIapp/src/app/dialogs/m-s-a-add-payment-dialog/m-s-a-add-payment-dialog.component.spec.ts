import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSAAddPaymentDialogComponent } from './m-s-a-add-payment-dialog.component';

describe('MSAAddPaymentDialogComponent', () => {
  let component: MSAAddPaymentDialogComponent;
  let fixture: ComponentFixture<MSAAddPaymentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSAAddPaymentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSAAddPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
