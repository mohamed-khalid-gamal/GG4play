import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, finalize } from 'rxjs/operators';
import { IconService, NormalizedIcon } from '../../../core/services/icon.service';

@Component({
    selector: 'app-icon-picker',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './icon-picker.component.html',
    styleUrl: './icon-picker.component.css'
})
export class IconPickerComponent implements OnInit, OnDestroy {
    private iconService = inject(IconService);
    private cdr = inject(ChangeDetectorRef);
    private searchSubject = new Subject<string>();
    private searchSubscription: Subscription | null = null;

    @Input() selectedIcon: string = '';
    @Output() iconSelected = new EventEmitter<string>();

    search = '';
    filteredIcons: NormalizedIcon[] = [];
    isLoading = false;
    loadError = false;

    ngOnInit(): void {
        this.searchSubscription = this.searchSubject.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            tap((query) => {
                this.isLoading = true;
                this.loadError = false;
                this.filteredIcons = [];
                this.cdr.markForCheck(); // Mark for check
            }),
            switchMap(query => this.iconService.searchIcons(query).pipe(
                finalize(() => {
                    this.isLoading = false;
                    this.cdr.markForCheck(); // Mark for check
                })
            ))
        ).subscribe({
            next: (icons) => {
                this.filteredIcons = icons;
                this.cdr.detectChanges(); // Force detect changes
            },
            error: (err) => {
                console.error('Failed to search icons:', err);
                this.loadError = true;
                this.isLoading = false;
                this.cdr.markForCheck();
            }
        });
    }

    ngOnDestroy(): void {
        this.searchSubscription?.unsubscribe();
    }

    onSearch(): void {
        const query = this.search.trim();
        if (query.length >= 2) {
            this.searchSubject.next(query);
        } else {
            this.filteredIcons = [];
            this.cdr.markForCheck();
        }
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
        this.filteredIcons = [];
        this.loadError = false;
    }
}
