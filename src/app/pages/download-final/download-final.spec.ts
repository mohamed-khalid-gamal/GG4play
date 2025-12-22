import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadFinal } from './download-final';

describe('DownloadFinal', () => {
  let component: DownloadFinal;
  let fixture: ComponentFixture<DownloadFinal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadFinal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadFinal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
