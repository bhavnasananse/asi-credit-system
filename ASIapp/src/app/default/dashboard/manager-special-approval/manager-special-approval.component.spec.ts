import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSpecialApprovalComponent } from './manager-special-approval.component';

describe('ManagerSpecialApprovalComponent', () => {
  let component: ManagerSpecialApprovalComponent;
  let fixture: ComponentFixture<ManagerSpecialApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSpecialApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSpecialApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
