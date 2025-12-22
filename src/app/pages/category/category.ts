import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class CategoryComponent {
  // Placeholder game IDs for static cards
  games = [
    { id: 'starfield', name: 'Starfield' },
    { id: 'cyberpunk-2077', name: 'Cyberpunk 2077' },
    { id: 'elden-ring', name: 'Elden Ring' },
    { id: 'valorant', name: 'Valorant' },
    { id: 'forza-horizon-5', name: 'Forza Horizon 5' },
    { id: 'doom-eternal', name: 'Doom Eternal' }
  ];
}
