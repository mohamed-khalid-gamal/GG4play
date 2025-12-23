import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameService } from '../../core/services/game.service';
import { Game, Platform } from '../../shared/models/game.model';
import { GameCardComponent } from '../../shared/components/game-card/game-card.component';

@Component({
    selector: 'app-platform-games',
    standalone: true,
    imports: [CommonModule, RouterLink, GameCardComponent],
    templateUrl: './platform-games.html',
    styleUrl: './platform-games.css'
})
export class PlatformGamesComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private gameService = inject(GameService);

    platform = signal<Platform | null>(null);
    games = signal<Game[]>([]);
    isLoading = signal(true);

    ngOnInit() {
        this.route.params.subscribe(params => {
            const slug = params['slug'];
            if (slug) {
                this.loadPlatformData(slug);
            }
        });
    }

    private loadPlatformData(slug: string) {
        this.isLoading.set(true);

        // Load platform info
        this.gameService.getPlatformBySlug(slug).subscribe(platform => {
            this.platform.set(platform || null);
        });

        // Load games for this platform
        this.gameService.getGamesByPlatformSlug(slug).subscribe(games => {
            this.games.set(games);
            this.isLoading.set(false);
        });
    }
}
