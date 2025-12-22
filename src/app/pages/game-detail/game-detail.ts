import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GameService } from '../../core/services/game.service';
import { DownloadService } from '../../core/services/download.service';
import { Game, GameVersion, GameUpdate, CDNLink, GameMedia } from '../../shared/models/game.model';
import { AdPlaceholderComponent } from '../../shared/components/ad-placeholder/ad-placeholder';
import { DownloadLinkCardComponent } from '../../shared/components/download-link-card/download-link-card';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, AdPlaceholderComponent, DownloadLinkCardComponent],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.css'
})
export class GameDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gameService = inject(GameService);
  private downloadService = inject(DownloadService);

  // State
  game = signal<Game | null>(null);
  isLoading = signal(true);
  selectedScreenshotIndex = signal(0);
  selectedVersionId = signal<string | null>(null);
  platformTab = signal<'windows' | 'linux'>('windows');

  // Computed values
  selectedVersion = computed(() => {
    const g = this.game();
    const vId = this.selectedVersionId();
    if (!g || g.versions.length === 0) return null;
    return g.versions.find(v => v.id === vId) || g.versions[0];
  });

  latestUpdate = computed(() => {
    const v = this.selectedVersion();
    if (!v || v.updates.length === 0) return null;
    return v.updates.find(u => u.isLatest) || v.updates[0];
  });

  selectedScreenshot = computed(() => {
    const g = this.game();
    const idx = this.selectedScreenshotIndex();
    if (!g?.screenshots || g.screenshots.length === 0) return null;
    return g.screenshots[idx];
  });

  displayRating = computed(() => this.game()?.rating?.toFixed(1) || 'N/A');

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');

    if (!gameId) {
      this.router.navigate(['/']);
      return;
    }

    this.gameService.getGameById(gameId).subscribe(game => {
      if (game) {
        this.game.set(game);
        if (game.versions.length > 0) {
          this.selectedVersionId.set(game.versions[0].id);
        }
      } else {
        this.router.navigate(['/']);
      }
      this.isLoading.set(false);
    });
  }

  selectScreenshot(index: number): void {
    this.selectedScreenshotIndex.set(index);
  }

  selectVersion(versionId: string): void {
    this.selectedVersionId.set(versionId);
  }

  startDownload(update: GameUpdate, link?: CDNLink): void {
    const g = this.game();
    const v = this.selectedVersion();
    if (!g || !v) return;

    this.downloadService.startDownload(g, v, update, link);
  }

  quickDownload(): void {
    const update = this.latestUpdate();
    if (update) {
      this.startDownload(update);
    }
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatDownloads(downloads: number): string {
    if (downloads >= 1000000) {
      return (downloads / 1000000).toFixed(1) + 'M';
    } else if (downloads >= 1000) {
      return Math.floor(downloads / 1000) + 'K';
    }
    return downloads.toString();
  }

  getRelativeTime(date: Date | undefined): string {
    if (!date) return '';
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }
}
