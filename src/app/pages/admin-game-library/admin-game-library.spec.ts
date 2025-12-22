import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGameLibrary } from './admin-game-library';

describe('AdminGameLibrary', () => {
  let component: AdminGameLibrary;
  let fixture: ComponentFixture<AdminGameLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGameLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGameLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
