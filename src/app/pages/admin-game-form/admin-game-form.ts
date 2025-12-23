import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GameService } from '../../core/services/game.service';
import { Game } from '../../shared/models/game.model';

@Component({
  selector: 'app-admin-game-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-game-form.html',
  styleUrl: './admin-game-form.css', // Ensure this file exists, or remove if not needed
})
export class AdminGameFormComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gameService = inject(GameService);

  isEditMode = false;
  gameId: string | null = null;
  activeTab: 'info' | 'media' | 'versions' = 'info';

  // Initialize with default empty game
  gameRequest: Partial<Game> = {
    title: '',
    description: '',
    status: 'Active',
    platforms: ['pc'],
    genres: ['action'],
    minimumRequirements: {
      os: 'Windows 10',
      processor: '',
      memory: '',
      graphics: '',
      storage: ''
    },
    rating: 0,
    downloads: 0,
    versions: [],
    screenshots: [],
    tags: []
  };

  constructor() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.gameId = params['id'];
        this.loadGame(this.gameId!);
      } else {
        // Ensure defaults for new game
        this.addVersion(); // Add default Global version
      }
    });
  }

  loadGame(id: string) {
    this.gameService.getGameById(id).subscribe(game => {
      if (game) {
        this.gameRequest = {
          ...game,
          versions: game.versions || [],
          screenshots: game.screenshots || [],
          platforms: game.platforms || [],
          genres: game.genres || [],
          tags: game.tags || []
        };
      }
    });
  }

  saveGame() {
    console.log('Saving game:', this.gameRequest);
    // In a real app, call service to save
    // this.gameService.saveGame(this.gameRequest);

    // Simulate success and redirect
    setTimeout(() => {
      this.router.navigate(['/admin/games']);
    }, 500);
  }

  // === Nested Form Helpers ===

  // Track by index for ngFor
  trackByIndex(index: number): number {
    return index;
  }

  // Genres
  addGenre() {
    if (!this.gameRequest.genres) this.gameRequest.genres = [];
    // Add a default genre that's not already in the list
    const availableGenres = ['action', 'rpg', 'strategy', 'adventure', 'simulation', 'sports', 'racing', 'horror'];
    const nextGenre = availableGenres.find(g => !this.gameRequest.genres!.includes(g)) || 'action';
    this.gameRequest.genres.push(nextGenre);
  }

  removeGenre(index: number) {
    this.gameRequest.genres?.splice(index, 1);
  }

  updateGenre(index: number, value: string) {
    if (this.gameRequest.genres) {
      this.gameRequest.genres[index] = value;
    }
  }

  moveGenre(index: number, direction: -1 | 1) {
    if (!this.gameRequest.genres) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= this.gameRequest.genres.length) return;

    // Swap the genres
    const temp = this.gameRequest.genres[index];
    this.gameRequest.genres[index] = this.gameRequest.genres[newIndex];
    this.gameRequest.genres[newIndex] = temp;
  }

  // Platforms
  addPlatform() {
    if (!this.gameRequest.platforms) this.gameRequest.platforms = [];
    const availablePlatforms = ['pc', 'ps5', 'ps4', 'ps3', 'ps2', 'ps1', 'xbox-series', 'xbox-one', 'xbox-360', 'switch', 'android', 'ios'];
    const nextPlatform = availablePlatforms.find(p => !this.gameRequest.platforms!.includes(p)) || 'pc';
    this.gameRequest.platforms.push(nextPlatform);
  }

  removePlatform(index: number) {
    this.gameRequest.platforms?.splice(index, 1);
  }

  updatePlatform(index: number, value: string) {
    if (this.gameRequest.platforms) {
      this.gameRequest.platforms[index] = value;
    }
  }

  movePlatform(index: number, direction: -1 | 1) {
    if (!this.gameRequest.platforms) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= this.gameRequest.platforms.length) return;

    // Swap the platforms
    const temp = this.gameRequest.platforms[index];
    this.gameRequest.platforms[index] = this.gameRequest.platforms[newIndex];
    this.gameRequest.platforms[newIndex] = temp;
  }

  // ScreenShots
  addScreenshot() {
    if (!this.gameRequest.screenshots) this.gameRequest.screenshots = [];
    this.gameRequest.screenshots.push({
      id: 'media-' + Date.now(),
      url: '',
      type: 'screenshot'
    });
  }

  removeScreenshot(index: number) {
    this.gameRequest.screenshots?.splice(index, 1);
  }

  // Versions
  addVersion() {
    if (!this.gameRequest.versions) this.gameRequest.versions = [];
    this.gameRequest.versions.push({
      id: 'ver-' + Date.now(),
      name: 'Global',
      language: 'English',
      updates: []
    });
  }

  removeVersion(index: number) {
    this.gameRequest.versions?.splice(index, 1);
  }

  // Updates
  addUpdate(versionIndex: number) {
    const version = this.gameRequest.versions![versionIndex];
    if (!version.updates) version.updates = [];
    version.updates.push({
      id: 'upd-' + Date.now(),
      name: 'v1.0.0',
      releaseDate: new Date(),
      size: '0 GB',
      isLatest: false,
      cdnLinks: []
    });
  }

  removeUpdate(versionIndex: number, updateIndex: number) {
    this.gameRequest.versions![versionIndex].updates.splice(updateIndex, 1);
  }

  // Links
  addLink(versionIndex: number, updateIndex: number) {
    const update = this.gameRequest.versions![versionIndex].updates[updateIndex];
    if (!update.cdnLinks) update.cdnLinks = [];
    update.cdnLinks.push({
      id: 'link-' + Date.now(),
      name: 'Main Link',
      url: '',
      provider: 'direct',
      type: 'direct'
    });
  }

  removeLink(versionIndex: number, updateIndex: number, linkIndex: number) {
    this.gameRequest.versions![versionIndex].updates[updateIndex].cdnLinks.splice(linkIndex, 1);
  }
}
