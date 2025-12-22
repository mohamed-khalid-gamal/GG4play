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
    genre: 'Action RPG',
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
    categories: [],
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
          categories: game.categories || [],
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
