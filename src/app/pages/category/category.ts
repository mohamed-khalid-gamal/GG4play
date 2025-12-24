import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

interface Game {
  id: string;
  name: string;
  genres: string[];
  platforms: string[];
  rating: number;
  image: string;
  price: string;
  discount?: string;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class CategoryComponent {
  // Full game data
  allGames: Game[] = [
    {
      id: 'starfield',
      name: 'Starfield',
      genres: ['Action RPG', 'FPS'],
      platforms: ['PC (Windows)', 'Xbox Series X'],
      rating: 4.5,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx1X_eboOiqEadQKeXhEMdpyAgQ0r4mxOgDrEMKBRtMUkuHCL04y6H_Dack0t3tVbtfzbEa3jgrixm2V0I2EOyf22JudIc8vMfqEDirhCSysMmUzw8_h_ujHaFN1r7nO8ZlcsHyG4ttB6wma2AOqvK43J7unrklu8XKa3En_gxnNIONjzrrAIE54USA5kSQwFwHR5FdMdWdGv5pDN7Ug6lHyuk7KpRiuolENPXuwYroys8nb8tn_e8xx4BdXg9bJ8w9x7p4m3IkgU',
      price: 'Free',
      discount: '-20%'
    },
    {
      id: 'cyberpunk-2077',
      name: 'Cyberpunk 2077',
      genres: ['Action RPG', 'FPS'],
      platforms: ['PC (Windows)', 'PlayStation 5', 'Xbox Series X'],
      rating: 4.8,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB91tbL_4N93xF4cMmNqA74u8nhrrlzcy4TPQtE-w1BEieRB5AjOE13JWmjnTTgcJA4IZcl_RCUW7ewhMWPZoYebuQuspNxHK7aBHBfZJ0Iyuul-Ii79sP4dnfmZ0xMv3OB55kaIRi8vub9QbKEYXFCXM_s1zVtmlIj80LEilrT9_mvvf4M8vhRSPcTgzdkT9RQ-3GgytSasPQKhLb3aNiWMC2-izgmvCC34uPNdcNRnGypPgxWBRLsubruq15Lqq3A5NejxNrAgBM',
      price: 'Free'
    },
    {
      id: 'elden-ring',
      name: 'Elden Ring',
      genres: ['Action RPG', 'Hack & Slash'],
      platforms: ['PC (Windows)', 'PlayStation 5', 'Xbox Series X'],
      rating: 4.9,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGbONEqMduD9sJpInJYMYvJKOcMqKzl7q4EFlLTpTAHEIb7VWTzmqod_GVLOY-qOKAI179sRZAtaxIGrC5CHZzYJwF1Y5JpGV85RJw0NVHqorahYkGoPgDuyNRJThyzDKNTZVZExHhwoPeA7LZiaqqfaOO3aiLQu6JTfF9Lw8ST3P60h4uCeDUhUn7ocyRu3FDiATiY0Pf83X6qApLYXVm0-Q8kA_HQEiOeQ6j2jCFpXaX_CKnvSwBJ-6A3bvFNcvS2f0LFBS91R4',
      price: 'Free'
    },
    {
      id: 'valorant',
      name: 'Valorant',
      genres: ['FPS', 'Battle Royale'],
      platforms: ['PC (Windows)'],
      rating: 4.4,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRKkdxkrR_Lq2ynjb3FZMzO7zi_wI-zCEgg6l83ZjJw90Ccce6INBq_GrCq2FMMPjJL-z8RG6rGd_IWoFNWnZe4-QSjhV6yRMtKlk4RGXo37dMgsLMnpGdaLNsm4R-7sRZuDsb5Ov4Q3EfRoCjFmu8Gsdc4oYD8z6_CFCdYTSjSd0SjMjuI_-Zno3q6Na6H66w_9yUCjFmcv2qdj8GyjxmE-w157tyuGbOoT-jSpUHMccL1H3BQSTneS1emPdiMJNMXXgU0CF5OUc',
      price: 'Free'
    },
    {
      id: 'forza-horizon-5',
      name: 'Forza Horizon 5',
      genres: ['Action RPG'],
      platforms: ['PC (Windows)', 'Xbox Series X'],
      rating: 4.7,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzPwEXCbTb3YD6M2WmJly3u-RDMnOTB5ZMDVLDsxEtFZl99i-cgF3eIBDtD560-AsGKzc0sB3iLuHrX7vyLocJutTHpOjzdFgJnQC0JABs2hVk87bIN4Bpr3KXaAp-nxrgNGrmsLIwyNDd6VrOpndETdiHVPg3UpV30uB-_ixILJsnsoDa2J8x3z3M1Rby3ijl4knkHrbNAXz-Xo2YFp8wDtNPavFrEZtH1cE43l2VgW57jT0yycapJWw16ls8RNJ1AVvIdvTjg98',
      price: 'Free'
    },
    {
      id: 'doom-eternal',
      name: 'Doom Eternal',
      genres: ['FPS', 'Hack & Slash'],
      platforms: ['PC (Windows)', 'PlayStation 5', 'Xbox Series X'],
      rating: 4.6,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx1X_eboOiqEadQKeXhEMdpyAgQ0r4mxOgDrEMKBRtMUkuHCL04y6H_Dack0t3tVbtfzbEa3jgrixm2V0I2EOyf22JudIc8vMfqEDirhCSysMmUzw8_h_ujHaFN1r7nO8ZlcsHyG4ttB6wma2AOqvK43J7unrklu8XKa3En_gxnNIONjzrrAIE54USA5kSQwFwHR5FdMdWdGv5pDN7Ug6lHyuk7KpRiuolENPXuwYroys8nb8tn_e8xx4BdXg9bJ8w9x7p4m3IkgU',
      price: 'Free'
    }
  ];

  // UI State signals
  viewMode = signal<'grid' | 'list'>('grid');
  sortBy = signal('popularity');
  showSortDropdown = signal(false);
  currentPage = signal(1);
  totalPages = 8;

  // Filter state
  selectedGenres = signal<string[]>([]);
  selectedPlatforms = signal<string[]>([]);

  // Computed filtered and sorted games
  filteredGames = computed(() => {
    let games = [...this.allGames];

    const genres = this.selectedGenres();
    const platforms = this.selectedPlatforms();

    // Filter by genres (if any selected)
    if (genres.length > 0) {
      games = games.filter(game =>
        genres.some(genre => game.genres.includes(genre))
      );
    }

    // Filter by platforms (if any selected)
    if (platforms.length > 0) {
      games = games.filter(game =>
        platforms.some(platform => game.platforms.includes(platform))
      );
    }

    // Sort
    const sort = this.sortBy();
    switch (sort) {
      case 'rating':
        games.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        games.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        // For demo, reverse order
        games.reverse();
        break;
      default: // popularity - keep original order
        break;
    }

    return games;
  });

  constructor(private router: Router) { }

  // View mode toggle
  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode.set(mode);
  }

  // Sort dropdown
  toggleSortDropdown(): void {
    this.showSortDropdown.update(v => !v);
  }

  setSortBy(sort: string): void {
    this.sortBy.set(sort);
    this.showSortDropdown.set(false);
  }

  // Genre filter toggle
  toggleGenre(genre: string): void {
    this.selectedGenres.update(genres => {
      if (genres.includes(genre)) {
        return genres.filter(g => g !== genre);
      } else {
        return [...genres, genre];
      }
    });
  }

  isGenreSelected(genre: string): boolean {
    return this.selectedGenres().includes(genre);
  }

  // Platform filter toggle
  togglePlatform(platform: string): void {
    this.selectedPlatforms.update(platforms => {
      if (platforms.includes(platform)) {
        return platforms.filter(p => p !== platform);
      } else {
        return [...platforms, platform];
      }
    });
  }

  isPlatformSelected(platform: string): boolean {
    return this.selectedPlatforms().includes(platform);
  }

  // Reset all filters
  resetFilters(): void {
    this.selectedGenres.set([]);
    this.selectedPlatforms.set([]);
  }

  // Pagination
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage.set(page);
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  // Hero actions
  playNow(): void {
    this.router.navigate(['/game', 'cyberpunk-2077']);
  }

  addToWishlist(): void {
    alert('Added to wishlist! (Feature coming soon)');
  }
}
