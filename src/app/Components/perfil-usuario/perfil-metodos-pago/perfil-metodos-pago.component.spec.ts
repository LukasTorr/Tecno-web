import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMetodosPagoComponent } from './perfil-metodos-pago.component';

describe('PerfilMetodosPagoComponent', () => {
  let component: PerfilMetodosPagoComponent;
  let fixture: ComponentFixture<PerfilMetodosPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilMetodosPagoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilMetodosPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
