import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSnacksComponent } from './admin-snacks.component';

describe('AdminSnacksComponent', () => {
  let component: AdminSnacksComponent;
  let fixture: ComponentFixture<AdminSnacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSnacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSnacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
