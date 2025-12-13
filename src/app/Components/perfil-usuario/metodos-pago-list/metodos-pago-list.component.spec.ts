import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosPagoListComponent } from './metodos-pago-list.component';

describe('MetodosPagoListComponent', () => {
  let component: MetodosPagoListComponent;
  let fixture: ComponentFixture<MetodosPagoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetodosPagoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetodosPagoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
