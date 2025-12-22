import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Game } from '../../models/game.model';

@Component({
    selector: 'app-game-list-item',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './game-list-item.component.html',
    styleUrl: './game-list-item.component.css'
})
export class GameListItemComponent {
    @Input() game!: Game;

    getTimeAgo(date?: Date): string {
        if (!date) return '';
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} days ago`;
    }
}