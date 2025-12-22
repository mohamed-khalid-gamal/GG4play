import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { GameService } from '../../core/services/game.service';
import { Category } from '../../shared/models/game.model';
import { IconPickerComponent } from '../../shared/components/icon-picker/icon-picker.component';

@Component({
    selector: 'app-admin-category-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, IconPickerComponent],
    templateUrl: './admin-category-form.html',
})
export class AdminCategoryFormComponent {
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private gameService = inject(GameService);

    isEditMode = false;
    categoryId: string | null = null;

    category: Partial<Category> & { color: string; icon: string } = {
        name: '',
        slug: '',
        description: '',
        icon: 'fa-solid fa-gamepad',
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

    constructor() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isEditMode = true;
                this.categoryId = params['id'];
                this.loadCategory(params['id']);
            }
        });
    }

    loadCategory(id: string) {
        this.gameService.getCategoryById(id).subscribe(cat => {
            if (cat) {
                this.category = {
                    ...cat,
                    color: cat.color || 'bg-indigo-500',
                    icon: cat.icon || 'fa-solid fa-gamepad'
                };
            }
        });
    }

    onIconSelected(iconClass: string): void {
        this.category.icon = iconClass;
    }

    saveCategory() {
        if (this.isEditMode && this.categoryId) {
            this.gameService.updateCategory(this.categoryId, this.category).subscribe(() => {
                this.router.navigate(['/admin/categories']);
            });
        } else {
            this.gameService.addCategory(this.category).subscribe(() => {
                this.router.navigate(['/admin/categories']);
            });
        }
    }
}
