import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditExpireComponent } from './credit-expire.component';

describe('CreditExpireComponent', () => {
  let component: CreditExpireComponent;
  let fixture: ComponentFixture<CreditExpireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditExpireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditExpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
