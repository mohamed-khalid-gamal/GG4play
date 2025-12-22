import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Game } from '../../models/game.model';

@Component({
    selector: 'app-game-card',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './game-card.component.html',
    styleUrl: './game-card.component.css'
})
export class GameCardComponent {
    @Input({ required: true }) game!: Game;
    @Output() onGameClick = new EventEmitter<Game>();

    get displayRating(): string {
        return this.game.rating?.toFixed(1) || 'N/A';
    }

    get downloadCount(): string {
        const downloads = this.game.downloads || 0;
        if (downloads >= 1000000) {
            return (downloads / 1000000).toFixed(1) + 'M';
        } else if (downloads >= 1000) {
            return (downloads / 1000).toFixed(1) + 'K';
        }
        return downloads.toString();
    }

    handleClick(): void {
        this.onGameClick.emit(this.game);
    }
}
