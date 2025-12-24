import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DownloadService } from '../../core/services/download.service';
import { CountdownTimerComponent } from '../../shared/components/countdown-timer/countdown-timer';
import { AdPlaceholderComponent } from '../../shared/components/ad-placeholder/ad-placeholder';

@Component({
  selector: 'app-download-waiting',
  standalone: true,
  imports: [CommonModule, RouterLink, CountdownTimerComponent, AdPlaceholderComponent],
  templateUrl: './download-waiting.html',
  styleUrl: './download-waiting.css'
})
export class DownloadWaitingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  downloadService = inject(DownloadService);

  isLoading = signal(true);
  hasValidSession = signal(false);

  get game() { return this.downloadService.currentGame(); }
  get update() { return this.downloadService.currentUpdate(); }
  get version() { return this.downloadService.currentVersion(); }
  get timerSeconds() { return this.downloadService.waitingTimerSeconds; }

  async ngOnInit(): Promise<void> {
    const gameId = this.route.snapshot.paramMap.get('id');

    if (!gameId) {
      this.router.navigate(['/']);
      return;
    }

    // Check if we have an active download session
    if (!this.downloadService.hasActiveSession()) {
      // Try to initialize from the game ID
      const success = await this.downloadService.initializeFromIds(gameId);
      this.hasValidSession.set(success);

      if (!success) {
        // No valid session, redirect to game page
        this.router.navigate(['/game', gameId]);
        return;
      }
    } else {
      this.hasValidSession.set(true);
    }

    this.isLoading.set(false);
  }

  onCountdownComplete(): void {
    this.downloadService.proceedToAdStep();
  }

  goBackToGame(): void {
    const gameId = this.downloadService.currentState()?.gameId;
    this.downloadService.clearState();
    if (gameId) {
      this.router.navigate(['/game', gameId]);
    } else {
      this.router.navigate(['/']);
    }
  }

  startFreeTrial(): void {
    alert('Pro Gamer Membership - Start your free trial! (Feature coming soon)');
  }
}
