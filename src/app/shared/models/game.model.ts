// CDN Provider types for download links
export type CDNProvider = 'mediafire' | 'gdrive' | 'mega' | 'torrent' | 'onedrive' | 'direct';
export type LinkType = 'direct' | 'torrent' | 'parts';

// CDN Download Link
export interface CDNLink {
    id: string;
    name: string;
    url: string;
    provider: CDNProvider;
    type: LinkType;
    partCount?: number; // For multi-part downloads
    description?: string; // e.g., "High Speed", "Single Link"
}

// Game Update (patch/version update)
export interface GameUpdate {
    id: string;
    versionName?: string; // e.g., "v2.1.0"
    name: string; // e.g., "Update v2.1.0"
    releaseDate: Date;
    size: string; // e.g., "68.4 GB"
    sizeBytes?: number;
    changelog?: string;
    isLatest: boolean;
    cdnLinks: CDNLink[];
}

// Game Version (e.g., Global, Arabic, etc.)
export interface GameVersion {
    id: string;
    name: string; // e.g., "Global Version", "Arabic Version"
    language: string;
    region?: string;
    description?: string; // e.g., "Multi-language • Standard Edition"
    icon?: string; // Material icon name
    color?: string; // Theme color for the version
    updates: GameUpdate[];
}

// System Requirements
export interface SystemRequirements {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage?: string;
    directX?: string;
}

// Game Screenshot/Media
export interface GameMedia {
    id: string;
    url: string;
    thumbnail?: string;
    type: 'screenshot' | 'video' | 'artwork';
    caption?: string;
}

// Game Status
export type GameStatus = 'Active' | 'Early Access' | 'Upcoming' | 'Archived';

// Main Game interface
export interface Game {
    id: string;
    title: string;
    slug?: string;
    description: string;
    shortDescription?: string;
    coverImage: string;
    bannerImage?: string;

    // Metadata
    rating?: number;
    ratingCount?: number;
    downloads: number;
    pageViews?: number;

    // Categorization
    platforms: string[];    // Platform IDs (e.g., ['pc', 'ps5', 'ps4'])
    genres: string[];       // Genre IDs (formerly categories)
    tags?: string[];

    // Dates
    releaseDate?: Date;
    lastUpdated?: Date;

    // Status
    status: GameStatus;
    isFeatured?: boolean;

    // Developer/Publisher
    developer: string;
    publisher?: string;

    // Media
    screenshots?: GameMedia[];

    // System Requirements
    minimumRequirements?: SystemRequirements;
    recommendedRequirements?: SystemRequirements;
    supportedPlatforms?: ('windows' | 'linux' | 'mac')[];

    // Versions and Downloads
    versions: GameVersion[];

    // Reviews
    reviews?: GameReview[];

    // Current/Latest info (computed or denormalized)
    currentVersion?: string; // e.g., "v2.1.0"
    totalSize?: string; // e.g., "68 GB"
}

// Platform (Main Category - Device/Console)
export interface Platform {
    id: string;
    name: string;           // "PlayStation 5"
    slug: string;           // "ps5"
    shortName: string;      // "PS5"
    icon: string;           // Material icon name
    color?: string;         // Tailwind class
    image?: string;
    order: number;          // Display order
    gameCount?: number;
}

// Genre (Subcategory - Game Type)
export interface Genre {
    id: string;
    name: string;
    slug: string;
    icon: string;           // Material symbol name
    image?: string;
    color?: string;         // Tailwind class like text-red-500
    description?: string;
    gameCount?: number;
}

// Legacy alias for backward compatibility
export type Category = Genre;


// Download State (for tracking user's download progress)
export interface DownloadState {
    gameId: string;
    game?: Game;
    versionId?: string;
    version?: GameVersion;
    updateId?: string;
    update?: GameUpdate;
    linkId?: string;
    link?: CDNLink;
    step: 1 | 2 | 3; // waiting, ad, final
    startedAt?: Date;
}

// Review/Comment
export interface GameReview {
    id: string;
    gameId: string;
    nickname: string;
    email?: string;
    rating: number;
    comment: string;
    createdAt: Date;
    likes: number;
    dislikes: number;
    adminReply?: {
        message: string;
        repliedAt: Date;
    };
}

// Admin Stats
export interface AdminStats {
    totalGames: number;
    totalDownloads: number;
    totalPageViews: number;
    uniqueVisitors: number;
    adRevenue: number;
    totalCategories: number;
    activeGames: number;
    recentDownloads: number; // Last 24h
}
