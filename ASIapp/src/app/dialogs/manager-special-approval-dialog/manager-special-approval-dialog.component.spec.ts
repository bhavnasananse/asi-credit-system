import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSpecialApprovalDialogComponent } from './manager-special-approval-dialog.component';

describe('ManagerSpecialApprovalDialogComponent', () => {
  let component: ManagerSpecialApprovalDialogComponent;
  let fixture: ComponentFixture<ManagerSpecialApprovalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSpecialApprovalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSpecialApprovalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
