import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSalasComponent } from './admin-salas.component';

describe('AdminSalasComponent', () => {
  let component: AdminSalasComponent;
  let fixture: ComponentFixture<AdminSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSalasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
