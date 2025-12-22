import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DownloadService } from '../../core/services/download.service';
import { AdPlaceholderComponent } from '../../shared/components/ad-placeholder/ad-placeholder';
import { DownloadLinkCardComponent } from '../../shared/components/download-link-card/download-link-card';

@Component({
  selector: 'app-download-ad',
  standalone: true,
  imports: [CommonModule, RouterLink, AdPlaceholderComponent],
  templateUrl: './download-ad.html',
  styleUrl: './download-ad.css'
})
export class DownloadAdComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  downloadService = inject(DownloadService);

  isLoading = signal(true);
  hasValidSession = signal(false);

  get game() { return this.downloadService.currentGame(); }
  get update() { return this.downloadService.currentUpdate(); }
  get version() { return this.downloadService.currentVersion(); }
  get link() { return this.downloadService.currentLink(); }
  get fileInfo() { return this.downloadService.getFileInfo(); }

  async ngOnInit(): Promise<void> {
    const gameId = this.route.snapshot.paramMap.get('id');

    if (!gameId) {
      this.router.navigate(['/']);
      return;
    }

    // Check if we have an active session
    if (!this.downloadService.hasActiveSession()) {
      // Try to restore session
      const success = await this.downloadService.initializeFromIds(gameId);
      if (!success) {
        this.router.navigate(['/game', gameId]);
        return;
      }
    }

    this.hasValidSession.set(true);
    this.isLoading.set(false);
  }

  continueToDownload(): void {
    this.downloadService.proceedToFinalStep();
  }

  goBackToGame(): void {
    const gameId = this.game?.id;
    this.downloadService.clearState();
    if (gameId) {
      this.router.navigate(['/game', gameId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
