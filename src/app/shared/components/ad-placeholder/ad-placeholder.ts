import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AdSize = 'banner' | 'rect' | 'leaderboard' | 'sidebar' | 'square';

@Component({
    selector: 'app-ad-placeholder',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ad-placeholder.html',
    styleUrl: './ad-placeholder.css'
})
export class AdPlaceholderComponent {
    @Input() size: AdSize = 'rect';
    @Input() label: string = 'Advertisement Space';
    @Input() sponsored: boolean = false;

    get sizeClasses(): string {
        switch (this.size) {
            case 'banner':
                return 'w-full h-[90px]';
            case 'leaderboard':
                return 'w-full max-w-[728px] h-[90px]';
            case 'rect':
                return 'w-[300px] h-[250px]';
            case 'sidebar':
                return 'w-full h-[600px]';
            case 'square':
                return 'w-[250px] h-[250px]';
            default:
                return 'w-full h-[200px]';
        }
    }
}
