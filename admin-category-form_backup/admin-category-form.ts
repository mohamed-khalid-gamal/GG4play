import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-admin-category-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './admin-category-form.html',
})
export class AdminCategoryFormComponent {
    private router = inject(Router);

    category = {
        name: '',
        slug: '',
        description: '',
        icon: 'fa-gamepad',
        color: 'bg-indigo-500'
    };

    colors = [
        { name: 'Indigo', class: 'bg-indigo-500', hex: '#6366f1' },
        { name: 'Red', class: 'bg-red-500', hex: '#ef4444' },
        { name: 'Green', class: 'bg-emerald-500', hex: '#10b981' },
        { name: 'Blue', class: 'bg-blue-500', hex: '#3b82f6' },
        { name: 'Purple', class: 'bg-purple-500', hex: '#a855f7' },
        { name: 'Pink', class: 'bg-pink-500', hex: '#ec4899' },
        { name: 'Orange', class: 'bg-orange-500', hex: '#f97316' },
        { name: 'Cyan', class: 'bg-cyan-500', hex: '#06b6d4' },
        { name: 'Yellow', class: 'bg-amber-500', hex: '#f59e0b' },
        { name: 'Slate', class: 'bg-slate-500', hex: '#64748b' },
    ];

    faIcons = [
        'fa-gamepad', 'fa-ghost', 'fa-dragon', 'fa-dungeon', 'fa-chess-rook',
        'fa-skull', 'fa-rocket', 'fa-car', 'fa-futbol', 'fa-basketball',
        'fa-puzzle-piece', 'fa-brain', 'fa-crosshairs', 'fa-shield-halved', 'fa-gun',
        'fa-vr-cardboard', 'fa-dice', 'fa-chess', 'fa-headset', 'fa-trophy',
        'fa-crown', 'fa-star', 'fa-heart', 'fa-fire', 'fa-bolt',
        'fa-gem', 'fa-coins', 'fa-scroll', 'fa-map', 'fa-compass',
        'fa-hat-wizard', 'fa-wand-magic-sparkles', 'fa-book-skull', 'fa-flask', 'fa-robot',
        'fa-paper-plane', 'fa-plane', 'fa-ship', 'fa-truck-monster', 'fa-motorcycle'
    ];

    saveCategory() {
        console.log('Saving category:', this.category);
        // Simulate save
        setTimeout(() => {
            this.router.navigate(['/admin/categories']);
        }, 500);
    }
}
