import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoSnacksComponent } from './catalogo-snacks.component';

describe('CatalogoSnacksComponent', () => {
  let component: CatalogoSnacksComponent;
  let fixture: ComponentFixture<CatalogoSnacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoSnacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoSnacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
