import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Platform } from '../../models/game.model';

@Component({
    selector: 'app-platform-card',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './platform-card.component.html',
    styleUrl: './platform-card.component.css'
})
export class PlatformCardComponent {
    @Input() platform!: Platform;

    get gradientClass(): string {
        // Map platform colors to background gradient classes
        // We use full strings to ensure Tailwind JIT picks them up if we were scanning this file, 
        // but since they are dynamic, we might still have issues if these classes aren't used elsewhere.
        // SAFE APPROACH: Use style binding for colors or ensure these specific classes exist.

        // Let's rely on a robust mapping based on the color property
        const colorMap: Record<string, string> = {
            'text-blue-500': 'from-blue-600 to-blue-900',
            'text-indigo-500': 'from-indigo-600 to-indigo-900',
            'text-blue-600': 'from-blue-700 to-blue-950',
            'text-slate-500': 'from-slate-600 to-slate-900',
            'text-slate-600': 'from-slate-700 to-slate-950',
            'text-slate-700': 'from-slate-800 to-black',
            'text-green-500': 'from-green-600 to-green-900',
            'text-green-600': 'from-green-700 to-green-950',
            'text-green-700': 'from-green-800 to-green-950',
            'text-red-500': 'from-red-600 to-red-900',
            'text-lime-500': 'from-lime-600 to-lime-900',
            'text-slate-400': 'from-slate-500 to-slate-800',
        };

        return colorMap[this.platform.color || ''] || 'from-slate-700 to-slate-900';
    }
}
