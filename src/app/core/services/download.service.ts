import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import {
    Game, GameVersion, GameUpdate, CDNLink, DownloadState
} from '../../shared/models/game.model';
import { GameService } from './game.service';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    // Download state using signals for reactivity
    private downloadState = signal<DownloadState | null>(null);

    // Computed values for easy access
    readonly currentState = computed(() => this.downloadState());
    readonly currentGame = computed(() => this.downloadState()?.game);
    readonly currentVersion = computed(() => this.downloadState()?.version);
    readonly currentUpdate = computed(() => this.downloadState()?.update);
    readonly currentLink = computed(() => this.downloadState()?.link);
    readonly currentStep = computed(() => this.downloadState()?.step || 1);

    // Configuration
    readonly waitingTimerSeconds = 10; // Configurable countdown duration
    readonly adTimerSeconds = 5;

    constructor(
        private router: Router,
        private gameService: GameService
    ) { }

    /**
     * Start download process for a specific game update
     */
    startDownload(
        game: Game,
        version: GameVersion,
        update: GameUpdate,
        link?: CDNLink
    ): void {
        this.downloadState.set({
            gameId: game.id,
            game,
            versionId: version.id,
            version,
            updateId: update.id,
            update,
            linkId: link?.id,
            link: link || update.cdnLinks[0], // Default to first link
            step: 1,
            startedAt: new Date()
        });

        // Navigate to the waiting page
        this.router.navigate(['/download/waiting', game.id]);
    }

    /**
     * Start download with just IDs (used when navigating directly via URL)
     */
    async initializeFromIds(
        gameId: string,
        versionId?: string,
        updateId?: string
    ): Promise<boolean> {
        return new Promise((resolve) => {
            this.gameService.getGameById(gameId).subscribe(game => {
                if (!game || game.versions.length === 0) {
                    resolve(false);
                    return;
                }

                // Find version or use first
                const version = versionId
                    ? game.versions.find(v => v.id === versionId)
                    : game.versions[0];

                if (!version || version.updates.length === 0) {
                    resolve(false);
                    return;
                }

                // Find update or use latest
                const update = updateId
                    ? version.updates.find(u => u.id === updateId)
                    : version.updates.find(u => u.isLatest) || version.updates[0];

                if (!update) {
                    resolve(false);
                    return;
                }

                this.downloadState.set({
                    gameId: game.id,
                    game,
                    versionId: version.id,
                    version,
                    updateId: update.id,
                    update,
                    link: update.cdnLinks[0],
                    step: 1,
                    startedAt: new Date()
                });

                resolve(true);
            });
        });
    }

    /**
     * Select a specific CDN link
     */
    selectLink(link: CDNLink): void {
        const state = this.downloadState();
        if (state) {
            this.downloadState.set({
                ...state,
                linkId: link.id,
                link
            });
        }
    }

    /**
     * Progress to step 2 (ad verification)
     */
    proceedToAdStep(): void {
        const state = this.downloadState();
        if (state) {
            this.downloadState.set({ ...state, step: 2 });
            this.router.navigate(['/download/ad', state.gameId]);
        }
    }

    /**
     * Progress to step 3 (final download)
     */
    proceedToFinalStep(): void {
        const state = this.downloadState();
        if (state) {
            this.downloadState.set({ ...state, step: 3 });
            this.router.navigate(['/download/final', state.gameId]);
        }
    }

    /**
     * Get the actual download URL
     */
    getDownloadUrl(): string | null {
        const link = this.currentLink();
        return link?.url || null;
    }

    /**
     * Execute the download (opens in new tab)
     */
    executeDownload(): void {
        const url = this.getDownloadUrl();
        if (url && url !== '#') {
            window.open(url, '_blank');
        }
    }

    /**
     * Clear download state
     */
    clearState(): void {
        this.downloadState.set(null);
    }

    /**
     * Check if there's an active download session
     */
    hasActiveSession(): boolean {
        return this.downloadState() !== null;
    }

    /**
     * Get formatted file info for display
     */
    getFileInfo(): { name: string; size: string; version: string; provider: string } | null {
        const state = this.downloadState();
        if (!state?.game || !state?.update) return null;

        return {
            name: `${state.game.title}_Setup`,
            size: state.update.size,
            version: state.update.name,
            provider: state.link?.name || 'Direct'
        };
    }
}
