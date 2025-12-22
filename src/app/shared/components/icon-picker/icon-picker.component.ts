import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconService, NormalizedIcon } from '../../../core/services/icon.service';

@Component({
    selector: 'app-icon-picker',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './icon-picker.component.html',
    styleUrl: './icon-picker.component.css'
})
export class IconPickerComponent implements OnInit {
    private iconService = inject(IconService);

    @Input() selectedIcon: string = '';
    @Output() iconSelected = new EventEmitter<string>();

    search = '';
    allIcons: NormalizedIcon[] = [];
    filteredIcons: NormalizedIcon[] = [];
    isLoading = true;
    loadError = false;

    ngOnInit(): void {
        this.iconService.getAllIcons().subscribe({
            next: (icons) => {
                this.allIcons = icons;
                this.filteredIcons = icons.slice(0, 50); // Show first 50 by default
                this.isLoading = false;
                console.log(`IconPicker loaded ${icons.length} icons`);
            },
            error: (err) => {
                console.error('Failed to load icons:', err);
                this.isLoading = false;
                this.loadError = true;
            }
        });
    }

    onSearch(): void {
        const query = this.search.toLowerCase().trim();

        if (!query) {
            this.filteredIcons = this.allIcons.slice(0, 50);
            return;
        }

        this.filteredIcons = this.allIcons.filter(icon =>
            icon.name.toLowerCase().includes(query) ||
            icon.label.toLowerCase().includes(query) ||
            icon.terms.some(term => term.toLowerCase().includes(query))
        ).slice(0, 100);
    }

    selectIcon(icon: NormalizedIcon): void {
        this.selectedIcon = icon.cssClass;
        this.iconSelected.emit(icon.cssClass);
    }

    isSelected(icon: NormalizedIcon): boolean {
        return this.selectedIcon === icon.cssClass;
    }

    clearSearch(): void {
        this.search = '';
        this.filteredIcons = this.allIcons.slice(0, 50);
    }
}
