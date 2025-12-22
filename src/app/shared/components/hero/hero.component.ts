import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Game } from '../../models/game.model';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css']
})
export class HeroComponent {
    @Input({ required: true }) game!: Game;
    @Output() onDownload = new EventEmitter<Game>();
    @Output() onLearnMore = new EventEmitter<Game>();

    private router = inject(Router);

    get displayRating(): string {
        return this.game.rating?.toFixed(1) || 'N/A';
    }

    get downloadCount(): string {
        const downloads = this.game.downloads || 0;
        if (downloads >= 1000000) {
            return (downloads / 1000000).toFixed(1) + 'M';
        } else if (downloads >= 1000) {
            return Math.floor(downloads / 1000) + 'K+';
        }
        return downloads.toString();
    }

    handleDownload(): void {
        this.onDownload.emit(this.game);
        this.router.navigate(['/game', this.game.id], { fragment: 'downloads' });
    }

    handleLearnMore(): void {
        this.onLearnMore.emit(this.game);
        this.router.navigate(['/game', this.game.id]);
    }
}
