import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DownloadService } from '../../core/services/download.service';
import { AdPlaceholderComponent } from '../../shared/components/ad-placeholder/ad-placeholder';
import { DownloadLinkCardComponent } from '../../shared/components/download-link-card/download-link-card';
import { CDNLink } from '../../shared/models/game.model';

@Component({
  selector: 'app-download-final',
  standalone: true,
  imports: [CommonModule, RouterLink, AdPlaceholderComponent, DownloadLinkCardComponent],
  templateUrl: './download-final.html',
  styleUrl: './download-final.css'
})
export class DownloadFinalComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  downloadService = inject(DownloadService);

  isLoading = signal(true);
  hasValidSession = signal(false);
  downloadStarted = signal(false);

  get game() { return this.downloadService.currentGame(); }
  get update() { return this.downloadService.currentUpdate(); }
  get version() { return this.downloadService.currentVersion(); }
  get link() { return this.downloadService.currentLink(); }
  get fileInfo() { return this.downloadService.getFileInfo(); }
  get allLinks() { return this.update?.cdnLinks || []; }

  async ngOnInit(): Promise<void> {
    const gameId = this.route.snapshot.paramMap.get('id');

    if (!gameId) {
      this.router.navigate(['/']);
      return;
    }

    if (!this.downloadService.hasActiveSession()) {
      const success = await this.downloadService.initializeFromIds(gameId);
      if (!success) {
        this.router.navigate(['/game', gameId]);
        return;
      }
    }

    this.hasValidSession.set(true);
    this.isLoading.set(false);
  }

  startDownload(): void {
    this.downloadStarted.set(true);
    this.downloadService.executeDownload();
  }

  selectAlternativeLink(link: CDNLink): void {
    this.downloadService.selectLink(link);
    this.startDownload();
  }

  goToGamePage(): void {
    const gameId = this.game?.id;
    this.downloadService.clearState();
    if (gameId) {
      this.router.navigate(['/game', gameId]);
    } else {
      this.router.navigate(['/']);
    }
  }

  goHome(): void {
    this.downloadService.clearState();
    this.router.navigate(['/']);
  }
}
