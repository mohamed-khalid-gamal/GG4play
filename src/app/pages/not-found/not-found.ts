import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="min-h-screen flex flex-col items-center justify-center bg-[#0b0e14] relative overflow-hidden text-center p-6">
        <!-- Background Effects -->
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        
        <div class="relative z-10 flex flex-col items-center animate-fade-in-up">
            <h1 class="text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-700 to-slate-900 leading-none select-none">404</h1>
            
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                <p class="text-2xl md:text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    Page Not Found
                </p>
            </div>
            
            <p class="text-slate-400 mt-8 max-w-md text-lg">
                The level you are looking for does not exist or has been moved to another server.
            </p>

            <div class="flex gap-4 mt-8">
                <a routerLink="/" 
                   class="px-8 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(13,89,242,0.3)] flex items-center gap-2">
                    <span class="material-symbols-outlined">home</span>
                    Return Home
                </a>
            </div>
        </div>
    </div>
  `
})
export class NotFoundComponent { }
