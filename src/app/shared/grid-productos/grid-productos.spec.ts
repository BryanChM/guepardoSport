import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridProductos } from './grid-productos';

describe('GridProductos', () => {
  let component: GridProductos;
  let fixture: ComponentFixture<GridProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridProductos],
    }).compileComponents();

    fixture = TestBed.createComponent(GridProductos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
