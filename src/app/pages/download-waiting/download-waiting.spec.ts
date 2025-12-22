import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadWaiting } from './download-waiting';

describe('DownloadWaiting', () => {
  let component: DownloadWaiting;
  let fixture: ComponentFixture<DownloadWaiting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadWaiting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadWaiting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
