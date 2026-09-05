import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCancelado } from './checkout-cancelado';

describe('CheckoutCancelado', () => {
  let component: CheckoutCancelado;
  let fixture: ComponentFixture<CheckoutCancelado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutCancelado],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutCancelado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
