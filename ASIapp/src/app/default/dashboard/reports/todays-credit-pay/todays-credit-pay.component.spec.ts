import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysCreditPayComponent } from './todays-credit-pay.component';

describe('TodaysCreditPayComponent', () => {
  let component: TodaysCreditPayComponent;
  let fixture: ComponentFixture<TodaysCreditPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysCreditPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysCreditPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
