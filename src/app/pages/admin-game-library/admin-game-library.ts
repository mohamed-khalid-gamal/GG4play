import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../core/services/game.service';
import { Game } from '../../shared/models/game.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-game-library',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-game-library.html',
  styleUrl: './admin-game-library.css',
})
export class AdminGameLibraryComponent {
  private gameService = inject(GameService);

  // Signals for filters
  searchTerm = signal('');
  filterStatus = signal('All');
  filterGenre = signal('All');

  // Load games as signal
  allGames = toSignal(this.gameService.getAllGames(), { initialValue: [] });

  // Computed filtered games
  filteredGames = computed(() => {
    let games = this.allGames();
    const term = this.searchTerm().toLowerCase();
    const status = this.filterStatus();
    const genre = this.filterGenre();

    return games.filter(game => {
      const matchesTerm = !term ||
        game.title.toLowerCase().includes(term) ||
        game.developer.toLowerCase().includes(term);
      const matchesStatus = status === 'All' || game.status === status;
      const matchesGenre = genre === 'All' || game.genres.includes(genre);

      return matchesTerm && matchesStatus && matchesGenre;
    });
  });

  selectedGame: Game | null = null;

  selectGame(game: Game) {
    this.selectedGame = game;
  }

  deleteGame(game: Game) {
    if (confirm(`Delete ${game.title}?`)) {
      this.gameService.deleteGame(game.id).subscribe(() => {
        // Refresh logic if needed, but signal should auto-update if service uses signals internally.
        // Since service mocks data but returns new Observable, we might need to manual refresh or make service signal-based.
        // For prototype, we'll just reload the page or re-fetch.
        window.location.reload();
      });
    }
  }

  saveChanges() {
    console.log('Save changes triggered');
    // For prototype, just log. In real app, would save 'selectedGame' changes if any inline editing was enabled.
  }

  deleteReview(reviewId: string) {
    if (confirm('Delete this review?')) {
      if (this.selectedGame && this.selectedGame.reviews) {
        this.selectedGame.reviews = this.selectedGame.reviews.filter(r => r.id !== reviewId);
        // In real app, call service.deleteReview(reviewId)
      }
    }
  }

  startDownload(update: any, link: any) {
    console.log('Admin testing download link:', link.url);
    window.open(link.url, '_blank');
  }
}
