import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutExito } from './checkout-exito';

describe('CheckoutExito', () => {
  let component: CheckoutExito;
  let fixture: ComponentFixture<CheckoutExito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutExito],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutExito);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
