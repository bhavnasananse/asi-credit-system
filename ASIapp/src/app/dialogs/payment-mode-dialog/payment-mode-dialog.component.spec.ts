import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentModeDialogComponent } from './payment-mode-dialog.component';

describe('PaymentModeDialogComponent', () => {
  let component: PaymentModeDialogComponent;
  let fixture: ComponentFixture<PaymentModeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentModeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentModeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
