import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { GameService } from '../../core/services/game.service';
import { LoadingService } from '../../core/services/loading.service';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { GameCardComponent } from '../../shared/components/game-card/game-card.component';
import { GameListItemComponent } from '../../shared/components/game-list-item/game-list-item.component';
import { Game, Category } from '../../shared/models/game.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, CategoryCardComponent, GameCardComponent, GameListItemComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private gameService = inject(GameService);
  private loadingService = inject(LoadingService);

  heroGame: Game | null = null;
  categories: Category[] = [];
  trendingGames: Game[] = [];
  freshArrivals: Game[] = [];

  ngOnInit(): void {
    // Start loading
    this.loadingService.startLoading('home-data');

    // Load all data in parallel
    forkJoin({
      hero: this.gameService.getHeroGame(),
      categories: this.gameService.getCategories(),
      trending: this.gameService.getTrendingGames(),
      fresh: this.gameService.getFreshArrivals()
    }).subscribe({
      next: (data) => {
        this.heroGame = data.hero ?? null;
        this.categories = data.categories;
        this.trendingGames = data.trending;
        this.freshArrivals = data.fresh;

        // Stop loading after data is ready
        this.loadingService.stopLoading('home-data');
      },
      error: (err) => {
        console.error('Failed to load home data:', err);
        this.loadingService.stopLoading('home-data');
      }
    });
  }
}
