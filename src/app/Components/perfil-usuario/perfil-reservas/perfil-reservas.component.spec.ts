import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilReservasComponent } from './perfil-reservas.component';

describe('PerfilReservasComponent', () => {
  let component: PerfilReservasComponent;
  let fixture: ComponentFixture<PerfilReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilReservasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
