import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAd } from './download-ad';

describe('DownloadAd', () => {
  let component: DownloadAd;
  let fixture: ComponentFixture<DownloadAd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadAd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadAd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
