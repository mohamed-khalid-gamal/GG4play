import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../core/services/game.service';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { GameCardComponent } from '../../shared/components/game-card/game-card.component';
import { GameListItemComponent } from '../../shared/components/game-list-item/game-list-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, CategoryCardComponent, GameCardComponent, GameListItemComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  private gameService = inject(GameService);

  heroGame$ = this.gameService.getHeroGame();
  categories$ = this.gameService.getCategories();
  trendingGames$ = this.gameService.getTrendingGames();
  freshArrivals$ = this.gameService.getFreshArrivals();
}
