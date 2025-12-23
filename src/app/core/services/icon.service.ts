import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay, of } from 'rxjs';

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
    searchIcons(query: string): Observable<NormalizedIcon[]> {
        if (!query || query.length < 2) {
            return of([]);
        }

        const graphqlQuery = {
            query: `
                query {
                    search(version: "6.x", query: "${query}", first: 20) {
                        id
                        label
                        familyStylesByLicense {
                            free {
                                style
                            }
                        }
                    }
                }
            `
        };

        return this.http.post<any>('https://api.fontawesome.com', graphqlQuery).pipe(
            map(response => {
                const icons = response.data?.search || [];
                const mapped = icons.map((icon: any) => {
                    // Determine style (prioritize solid)
                    const freeStyles = icon.familyStylesByLicense?.free || [];
                    const styles = freeStyles.map((s: any) => s.style);
                    let style = 'solid';

                    if (styles.includes('solid')) style = 'solid';
                    else if (styles.includes('regular')) style = 'regular';
                    else if (styles.includes('brands')) style = 'brands';
                    else if (styles.length > 0) style = styles[0];

                    return {
                        name: icon.id,
                        label: icon.label || icon.id,
                        terms: [],
                        styles: styles,
                        cssClass: `fa-${style} fa-${icon.id}` // Use generic mapping for now
                    };
                });

                return mapped.filter((icon: NormalizedIcon) => icon.styles.length > 0);
            })
        );
    }
}
