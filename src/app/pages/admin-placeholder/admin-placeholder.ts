import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-admin-placeholder',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="flex flex-col items-center justify-center p-12 text-center h-[calc(100vh-8rem)]">
        <div class="size-24 rounded-full bg-slate-800 flex items-center justify-center mb-6">
            <span class="material-symbols-outlined text-4xl text-slate-500">construction</span>
        </div>
        <h2 class="text-2xl font-bold text-white mb-2">Under Construction</h2>
        <p class="text-slate-400 max-w-md mb-8">This module is part of the planned roadmap but hasn't been implemented yet in this prototype.</p>
        <a routerLink="/admin/dashboard" class="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors">
            Back to Dashboard
        </a>
    </div>
  `
})
export class AdminPlaceholderComponent { }
