import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteRegistro } from './cliente-registro';

describe('ClienteRegistro', () => {
  let component: ClienteRegistro;
  let fixture: ComponentFixture<ClienteRegistro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteRegistro],
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteRegistro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
