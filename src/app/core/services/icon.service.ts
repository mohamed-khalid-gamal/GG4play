import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

export interface NormalizedIcon {
    name: string;
    label: string;
    terms: string[];
    styles: string[];
    cssClass: string;
}

@Injectable({
    providedIn: 'root'
})
export class IconService {
    private http = inject(HttpClient);
    private iconsCache$: Observable<NormalizedIcon[]> | null = null;

    /**
     * Load all icons from the local JSON file
     * Results are cached after first load
     */
    getAllIcons(): Observable<NormalizedIcon[]> {
        if (this.iconsCache$) {
            return this.iconsCache$;
        }

        this.iconsCache$ = this.http.get<Record<string, any>>('assets/icons.json').pipe(
            map(data => {
                const icons: NormalizedIcon[] = [];

                for (const [name, meta] of Object.entries(data)) {
                    // Determine the best style (prefer solid > regular > brands)
                    const styles = meta.styles || [];
                    const freeStyles = meta.free || [];

                    let style = 'solid';
                    if (freeStyles.includes('solid')) {
                        style = 'solid';
                    } else if (freeStyles.includes('regular')) {
                        style = 'regular';
                    } else if (freeStyles.includes('brands')) {
                        style = 'brands';
                    } else if (styles.length > 0) {
                        style = styles[0];
                    }

                    icons.push({
                        name,
                        label: meta.label || name,
                        terms: meta.search?.terms || [],
                        styles: freeStyles,
                        cssClass: `fa-${style} fa-${name}`
                    });
                }

                console.log(`Loaded ${icons.length} icons from icons.json`);
                return icons;
            }),
            shareReplay(1)
        );

        return this.iconsCache$;
    }
}
