import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CDNLink, CDNProvider } from '../../models/game.model';

@Component({
    selector: 'app-download-link-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './download-link-card.html',
    styleUrl: './download-link-card.css'
})
export class DownloadLinkCardComponent {
    @Input({ required: true }) link!: CDNLink;
    @Input() compact: boolean = false;
    @Output() onSelect = new EventEmitter<CDNLink>();

    // Provider icon mapping
    getProviderIcon(provider: CDNProvider): string {
        const icons: Record<CDNProvider, string> = {
            'mediafire': 'cloud_queue',
            'gdrive': 'add_to_drive',
            'mega': 'cloud_download',
            'torrent': 'hub',
            'onedrive': 'cloud',
            'direct': 'link'
        };
        return icons[provider] || 'download';
    }

    // Provider color classes
    getProviderColor(provider: CDNProvider): string {
        const colors: Record<CDNProvider, string> = {
            'mediafire': 'text-[#129cff] bg-[#129cff]/10',
            'gdrive': 'text-[#0F9D58] bg-[#0F9D58]/10',
            'mega': 'text-[#cc0000] bg-[#cc0000]/10',
            'torrent': 'text-[#6ac829] bg-[#6ac829]/10',
            'onedrive': 'text-[#0078d4] bg-[#0078d4]/10',
            'direct': 'text-primary bg-primary/10'
        };
        return colors[provider] || 'text-white bg-white/10';
    }

    // Hover border color
    getHoverBorderColor(provider: CDNProvider): string {
        const colors: Record<CDNProvider, string> = {
            'mediafire': 'hover:border-[#129cff]',
            'gdrive': 'hover:border-[#0F9D58]',
            'mega': 'hover:border-[#cc0000]',
            'torrent': 'hover:border-[#6ac829]',
            'onedrive': 'hover:border-[#0078d4]',
            'direct': 'hover:border-primary'
        };
        return colors[provider] || 'hover:border-white';
    }

    handleClick(): void {
        this.onSelect.emit(this.link);
    }
}
