import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/game.model';

@Component({
    selector: 'app-category-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './category-card.component.html',
    styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
    @Input() category!: Category;
}
