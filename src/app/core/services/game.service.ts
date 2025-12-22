import { Injectable, signal, computed } from '@angular/core';
import {
    Game, Category, GameVersion, GameUpdate, CDNLink,
    GameStatus, DownloadState, AdminStats
} from '../../shared/models/game.model';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    // Categories data
    private categories: Category[] = [
        {
            id: 'cat-1',
            name: 'Action',
            slug: 'action',
            icon: 'swords',
            color: 'text-red-500',
            description: 'Fast-paced combat and thrilling gameplay',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB1Ox-1t7iGVXwwZha_dp25BXvZP8MO5iLnVGA2jSHPa11Valj9k9h2OPzrQJB0ervV6reMczMsVI-r3wGCxMeIqHk72WEXqSQWU7dUOF3i31G1gd1oxQvjBTMoHEehqcanNnlPcqDP3pyoeJV4IxgxyvE-d6-bC3GLvKZBrf8a3mnqoL0OD5-irRMC8aWxDPaImnHhl0tv0kbKmsOnP4scJGcMuxzq6n3LWhMvU6Dba_iigqKn_C1tBf0cr9h5hKW5Zf07WHpNc8',
            gameCount: 45
        },
        {
            id: 'cat-2',
            name: 'RPG',
            slug: 'rpg',
            icon: 'auto_fix',
            color: 'text-purple-500',
            description: 'Character development and immersive worlds',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwNpliBOfwzM5Pv_a4v0flrjWVZvEAzCf9U6pq1tYJjMFNJn8zZaXUN-Jp9eu3CaZhsokXO3RT4Co4gv7ugIvzeBnFgu2ufNRIOffwLaqPWud1jBZEQa1iT50CP5BhmewsRTotBvMbc2wkosUz0tfZ8zORj__0zSfkO_cLkzvKCzRtzAPT0gzkuiJSw41As0j0sXNWToBVivtdhTP1rXb2JBnbrP_uBCeL2oEjQP5KUOXdEPbZnjL8viSnXzoP4HiX1bJqXTjTHH8',
            gameCount: 38
        },
        {
            id: 'cat-3',
            name: 'Racing',
            slug: 'racing',
            icon: 'sports_motorsports',
            color: 'text-yellow-500',
            description: 'High-speed racing experiences',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuP7NyRguVug_qfcTcIeGk8367ma_KFrlBJuxUAdphl_Wo32GmCZDav0LFBaJ-e0_7xxZBHdSM8tEggDPwZzz7kn--LuONsw3s1VDNgyCMYRNRgDeK2A_36cNnybR7TdvNMcYsagu-fyU1jFDn-Hdyvlmx3Uv5pjGfCooItX-c5ivs5l-mhVQN41BTPOhel5QLO_sZKfr54JHDRPOLe3ZjTwnr17j_5ANmx98NyzVwynLiNpvZ_OO-ijFcA9c0q1hGIJhy7XNB-Y8',
            gameCount: 22
        },
        {
            id: 'cat-4',
            name: 'Strategy',
            slug: 'strategy',
            icon: 'psychology',
            color: 'text-green-500',
            description: 'Tactical thinking and planning',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcKcGhp5VOUaTK3jNXetr0yRH6SteidWWO6uUZyTdKWtVyT__pNxtOwR2HnlwvPvKIljFusziGj2FuHSr825iOegEdSUzkLT6H4Vtr1JOrr1FOLgO7RwEapoq1yNc1Tf7SiChaIAdRA73iiPv_E50nKs65f5CObUYp20vhqkZ0tWIuc2Wcrs0ikrZarI9ls-di11V1eh3w2C4Thq_Feg5cln5tjwFpyoSxbTSrW_nq_HxfvTw1e1sJgFTivKI9_xheU5u0rTekeXw',
            gameCount: 28
        },
        {
            id: 'cat-5',
            name: 'Horror',
            slug: 'horror',
            icon: 'skull',
            color: 'text-rose-600',
            description: 'Spine-chilling scares and suspense',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZXs1ovfWGnMCG2NV4_O98fHCeu9UUbc1F4WbAEiv-yeGrQ24Ac3OWrm_wBFSitJrz_rmflpZzTczYdB7T9paGimxczVUDApDlYiiOYN0W2AyeoIIksImP6gX-zKXgVRwRN371esbUv6xiYF1D9SrjSL1r0X9xPtcjDFHpGXoIVNUBbCV-MO6uTRUcM-cPiUp9E-GYajvKS8oMwNype0DtjzNco3kLQKkySJ_U517uPODds8vOO9Pb8CVXVywYDr0iNLFiEEOYl4',
            gameCount: 15
        },
        {
            id: 'cat-6',
            name: 'Adventure',
            slug: 'adventure',
            icon: 'explore',
            color: 'text-cyan-500',
            description: 'Exploration and story-driven quests',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB13cVxEbNNO5J2bSV-iGxzZxPOjuxoU-1O_XS-3bYBOazlxKF6AckJeYbWIzXYzOzeEqFKKe0ICa4F6PJR0b8NBOTHPbrovZAI139s55_gpPHz0uGEMP8hsxJGgcvsVbLQStAddXVAl-3X5TNKLIMbsse8ln0pxQ0fGY2yQZrUUVV7G_uikNSV-6boAec5_e7sSSzUMbKoJ07rnSKuarOl7gGMtiWdghBXNArWlf5YQA-Sx7Qi2mAhw9iT21DAm2fl2ojtGjxpmgo',
            gameCount: 32
        }
    ];

    // Full games data with versions, updates, and CDN links
    private games: Game[] = [
        {
            id: 'cyber-rebellion-2077',
            title: 'Cyber Rebellion 2077',
            slug: 'cyber-rebellion-2077',
            description: 'Welcome to the dark future. Cyber Rebellion 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character\'s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.',
            shortDescription: 'Experience the future of open-world RPGs. Immerse yourself in a neon-soaked metropolis where every choice shapes your destiny.',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ5bEh6Pu5I-FpUlo_Dc07sw-tqUN5TqPul1XzXV4K0UJxUUK1PaSzSr0LIhQCPhYt1w-w73EGyeyEaCyoT6q-nFQ6P75vSm7AjRkk85zBuXx0rEV_8dtgmqTcdhxev2BJFAlgkXT3ftiBc_kfgFydsCKpJUTQgBJ0oJQ-pFL0O84etTWDjv3GqW4tTuTbax2pMI_z_odpHk4fIZiFqW1XRs5GfUrFMhRDB2G87PQVnvrW1UxEqk8fCcY7QoHSUuvH6mEws1rh1aU',
            bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0CahraWRdlZt-HckmH22ViI4mETw5ABV1tYbek7L4zDqRWqChFR_B_Rg_KdPsa7h3kUEHGSic9k7X1sewA1QRq2uXGxJYTDD7xxmTgYEQSrpy3oGOvEkyENiXZ5HLcqyxGEX_pSBXIW_uAXafzmRxZVbyyhqrr2sZ2LYzfZnory-c67ycBaaXAzYM3TCaPK5Z2lBB8cBSvDVLqZH5fLRbglAXTO7c29Nm-XrwHhcM_SoBytK5eRp2SmK54M-ysyikt4FobW3j-mc',
            rating: 4.8,
            ratingCount: 12500,
            downloads: 125000,
            pageViews: 450000,
            genre: 'Action RPG',
            categories: ['cat-1', 'cat-2'],
            tags: ['Open World', 'Sci-Fi', 'FPS', 'Story Rich', 'Cyberpunk'],
            releaseDate: new Date('2077-11-14'),
            lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            status: 'Active',
            isFeatured: true,
            developer: 'NeonSoft Studios',
            publisher: 'Global Corp',
            screenshots: [
                { id: 'ss1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlVtd6XGYmTZyuLYwrovwN9x0UDNn8Ka2nfe6w_FJqUAvUV85sB5EGcVmvJpVg6tdd2zw4ZFz6CGoUYFmCGzTQXTlrlxJX_nqGyQ7d-EuLVP6FRxqZZ0uP7kdmc1LjIQyNz4JAMF2oSKqcvMyW6cR3XJNfxzlg8BXYaMpJE9i9jAKll_am2Wl4b4dWfDaEegmV78OZapEEe9HTgBUuAmzrXkax7QtwdDz5bXAZFyyafIjVqN990BYVj5i7Aszj-HqZxKO53OCzHgw', thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA308zN0aAqbujRFuVKZMAUptC0KxCBaGmTTPmAo17gDiBwz3K_GG0DYnWhN65tVcbhCXT81fx7FWgp5kq1Eu0rULpyY2gXs5INrPFlA6Zc_SbstKtNSAW2ANxO1R5KnkuTmlWRR_Z1tjW1PmmVRE1HfyLfqJzl-sy8UikAYgikFnYmxOZSodqUMGnUrQTpScDbXWQhkIjPc2BCoywksXiJAu5DMafQZKwBwZZozl8HTFWMNvfiS3avtYf86SLSHz1-5h4Gpxl56xQ', type: 'screenshot', caption: 'Night City Streets' },
                { id: 'ss2', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3kNJw1cw04tkT4vshiRFh1hn9YxyfmheZZ4FlQMOp7ovDJb4aPu9s_GEk_B5V4mTe3z4hWfJthblQX0a8xjR7MadixQVd-EsciuXBmdZiKIT1ZAjODbgF7iFbHrIIA4te0ycbh4K-mUhOf68ooXPV5-9R__d7hfKUB4jG-2gj5btIOzVWMue-fPlwy09zQwg5jP_OYR0ZE89WbE3DE5YGBxzyZT_BnVF6SC8-nVL1yp6n3nyk1cE3K8B6geUaY9429HcVccT0cSg', thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3kNJw1cw04tkT4vshiRFh1hn9YxyfmheZZ4FlQMOp7ovDJb4aPu9s_GEk_B5V4mTe3z4hWfJthblQX0a8xjR7MadixQVd-EsciuXBmdZiKIT1ZAjODbgF7iFbHrIIA4te0ycbh4K-mUhOf68ooXPV5-9R__d7hfKUB4jG-2gj5btIOzVWMue-fPlwy09zQwg5jP_OYR0ZE89WbE3DE5YGBxzyZT_BnVF6SC8-nVL1yp6n3nyk1cE3K8B6geUaY9429HcVccT0cSg', type: 'screenshot', caption: 'Combat Scene' },
                { id: 'ss3', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-i-5SKLJH48pu2gd40gDvunasuTo5J_U9IQcyv6GlJPnF6V519ehAKeGxc3a_rvdlmm23iz1h1Ek5I9hSJPf7PxOr88NDuIkgqLbclGMiksANXK21DhGcpfjWKHtP-lmwrnzCZpLoZ9WVtu141HcQFYCHUB3zr-YO6lqhQR1ttRuAzbkWG7tlqNSNjWDQilSkFH9aMQ-tbd7-PjBEwq-OgYtgU9v0mGv4r2aZOK9sLURclpMSwJxqOj0IuFGgs0D8D5oVITFiIQA', thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-i-5SKLJH48pu2gd40gDvunasuTo5J_U9IQcyv6GlJPnF6V519ehAKeGxc3a_rvdlmm23iz1h1Ek5I9hSJPf7PxOr88NDuIkgqLbclGMiksANXK21DhGcpfjWKHtP-lmwrnzCZpLoZ9WVtu141HcQFYCHUB3zr-YO6lqhQR1ttRuAzbkWG7tlqNSNjWDQilSkFH9aMQ-tbd7-PjBEwq-OgYtgU9v0mGv4r2aZOK9sLURclpMSwJxqOj0IuFGgs0D8D5oVITFiIQA', type: 'screenshot', caption: 'Character Customization' },
                { id: 'ss4', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgNF6lVqaxYrD8YbX8wTQw3K-F_48Q0k4X1e43SPA1B5pk7hBTICPs5rnHNojCOJt64SHXXTGSqJ55B1T_dbbHMayLQei7DZL_SSfM-UMDOaMKejOQwpbLjPxZ9I7PBr-j9Fi3eGCEfrbIaKIdbcQCmmHSbdIr-hATNe24Pn555RBmi0HsCKwMtVLbYA_rpNkD4mETy5_SypFiyCY6GLwioqU6IVwiZLDDS2kRuDAAh2jFi7-mD_RFa7y-CtkxFSvcVx6rHISgkGA', thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgNF6lVqaxYrD8YbX8wTQw3K-F_48Q0k4X1e43SPA1B5pk7hBTICPs5rnHNojCOJt64SHXXTGSqJ55B1T_dbbHMayLQei7DZL_SSfM-UMDOaMKejOQwpbLjPxZ9I7PBr-j9Fi3eGCEfrbIaKIdbcQCmmHSbdIr-hATNe24Pn555RBmi0HsCKwMtVLbYA_rpNkD4mETy5_SypFiyCY6GLwioqU6IVwiZLDDS2kRuDAAh2jFi7-mD_RFa7y-CtkxFSvcVx6rHISgkGA', type: 'screenshot', caption: 'Driving in Night City' }
            ],
            minimumRequirements: {
                os: 'Windows 10 (64-bit)',
                processor: 'Intel Core i5-3570K / AMD FX-8310',
                memory: '8 GB RAM',
                graphics: 'NVIDIA GTX 780 / AMD RX 470',
                storage: '70 GB',
                directX: 'Version 12'
            },
            recommendedRequirements: {
                os: 'Windows 10/11 (64-bit)',
                processor: 'Intel Core i7-4790 / AMD Ryzen 3 3200G',
                memory: '12 GB RAM',
                graphics: 'NVIDIA GTX 1060 6GB / AMD R9 Fury',
                storage: '70 GB SSD',
                directX: 'Version 12'
            },
            supportedPlatforms: ['windows'],
            reviews: [
                {
                    id: 'rev1', gameId: 'g1', nickname: 'Gamer123', rating: 5,
                    comment: 'Best game ever! The expansion link worked perfectly.',
                    createdAt: new Date('2024-06-25'), likes: 12, dislikes: 0
                },
                {
                    id: 'rev2', gameId: 'g1', nickname: 'SoulsFan', rating: 4,
                    comment: 'Download was fast but installation took a while.',
                    createdAt: new Date('2024-06-24'), likes: 5, dislikes: 1,
                    adminReply: { message: 'Installation depends on your disk speed. Thanks for downloading!', repliedAt: new Date('2024-06-24') }
                }
            ],
            versions: [
                {
                    id: 'v-global',
                    name: 'Global Version',
                    language: 'Multi-language',
                    region: 'Global',
                    description: 'Multi-language • Standard Edition',
                    icon: 'public',
                    color: 'primary',
                    updates: [
                        {
                            id: 'u-2.1.0',
                            name: 'Update v2.1.0',
                            releaseDate: new Date('2077-10-24'),
                            size: '68.4 GB',
                            sizeBytes: 73459343360,
                            changelog: 'Major performance improvements, Ray-tracing overdrive mode, new quests',
                            isLatest: true,
                            cdnLinks: [
                                { id: 'l1', name: 'Mediafire', url: 'https://mediafire.com/download/cyber2077', provider: 'mediafire', type: 'parts', partCount: 8, description: 'High Speed' },
                                { id: 'l2', name: 'Google Drive', url: 'https://drive.google.com/cyber2077', provider: 'gdrive', type: 'direct', description: 'Single Link (Limit)' },
                                { id: 'l3', name: 'Torrent', url: 'magnet:?xt=cyber2077', provider: 'torrent', type: 'torrent', description: 'Magnet (P2P)' }
                            ]
                        },
                        {
                            id: 'u-2.0.0',
                            name: 'Update v2.0.0',
                            releaseDate: new Date('2077-09-10'),
                            size: '65.2 GB',
                            sizeBytes: 70017330380,
                            changelog: 'Phantom Liberty expansion, major overhaul',
                            isLatest: false,
                            cdnLinks: [
                                { id: 'l4', name: 'Mega.nz', url: 'https://mega.nz/cyber2077-v2', provider: 'mega', type: 'direct', description: 'Single Link' },
                                { id: 'l5', name: 'Torrent', url: 'magnet:?xt=cyber2077-v2', provider: 'torrent', type: 'torrent', description: 'Legacy' }
                            ]
                        }
                    ]
                },
                {
                    id: 'v-arabic',
                    name: 'Arabic Version (Localized)',
                    language: 'Arabic',
                    region: 'MENA',
                    description: 'Full Audio & Text Support',
                    icon: 'translate',
                    color: 'green-500',
                    updates: [
                        {
                            id: 'u-ar-2.1.0',
                            name: 'Update v2.1.0 AR',
                            releaseDate: new Date('2077-10-26'),
                            size: '69.1 GB',
                            sizeBytes: 74210818867,
                            changelog: 'Arabic localization with full voice acting',
                            isLatest: true,
                            cdnLinks: [
                                { id: 'l6', name: 'Mediafire', url: 'https://mediafire.com/download/cyber2077-ar', provider: 'mediafire', type: 'parts', partCount: 8 },
                                { id: 'l7', name: 'Direct Link', url: 'https://direct.gg4play.com/cyber2077-ar', provider: 'direct', type: 'direct' }
                            ]
                        }
                    ]
                }
            ],
            currentVersion: 'v2.1.0',
            totalSize: '68 GB'
        },
        {
            id: 'galactic-wars',
            title: 'Galactic Wars',
            slug: 'galactic-wars',
            description: 'Epic space battles and planetary conquest await in this action-packed RPG. Command your fleet across the galaxy, forge alliances, and become the supreme commander.',
            shortDescription: 'Epic space battles and planetary conquest in this action RPG.',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsPwsOJmnLf3W72JcCsG_UO8tjR-BqCc3UM7hK9b7uiuSfN4ADvPaGm64x9-hUAPYq5Bf2rWakmzWWJ9StKfQOdLX-CDAxTbnmIuUMZHmfqNnaX13QCcv3HYDxTZ18R7sUk1mJ8cgy5gRoW5hYE2Jb7l1Xeo-Xii8kX2Dhq6I2Kp6Uc_MF6L8yHuqmYLo1FrXczwfBs3LtRebr-F1gInL3bVRQa65O-kjy1hEqZw1lpeL4zvLvjZI0MYZnmUUZarbPNJAf6B1RB9k',
            bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsPwsOJmnLf3W72JcCsG_UO8tjR-BqCc3UM7hK9b7uiuSfN4ADvPaGm64x9-hUAPYq5Bf2rWakmzWWJ9StKfQOdLX-CDAxTbnmIuUMZHmfqNnaX13QCcv3HYDxTZ18R7sUk1mJ8cgy5gRoW5hYE2Jb7l1Xeo-Xii8kX2Dhq6I2Kp6Uc_MF6L8yHuqmYLo1FrXczwfBs3LtRebr-F1gInL3bVRQa65O-kjy1hEqZw1lpeL4zvLvjZI0MYZnmUUZarbPNJAf6B1RB9k',
            rating: 4.8,
            ratingCount: 8900,
            downloads: 89000,
            pageViews: 320000,
            genre: 'Action RPG',
            categories: ['cat-1', 'cat-2'],
            tags: ['Space', 'Strategy', 'Multiplayer'],
            releaseDate: new Date('2024-03-15'),
            lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            status: 'Active',
            isFeatured: false,
            developer: 'Stellar Games',
            publisher: 'Cosmic Entertainment',
            screenshots: [],
            minimumRequirements: { os: 'Windows 10', processor: 'i5-6600', memory: '8 GB', graphics: 'GTX 960' },
            recommendedRequirements: { os: 'Windows 11', processor: 'i7-9700', memory: '16 GB', graphics: 'RTX 2060' },
            supportedPlatforms: ['windows'],
            versions: [
                {
                    id: 'v-global',
                    name: 'Standard Edition',
                    language: 'English',
                    updates: [
                        {
                            id: 'u-1.2',
                            name: 'Update v1.2',
                            releaseDate: new Date('2024-06-20'),
                            size: '45 GB',
                            isLatest: true,
                            cdnLinks: [
                                { id: 'l1', name: 'Mediafire', url: '#', provider: 'mediafire', type: 'parts', partCount: 5 },
                                { id: 'l2', name: 'Google Drive', url: '#', provider: 'gdrive', type: 'direct' }
                            ]
                        }
                    ]
                }
            ],
            currentVersion: 'v1.2',
            totalSize: '45 GB'
        },
        {
            id: 'neon-racer',
            title: 'Neon Racer',
            slug: 'neon-racer',
            description: 'Race through neon-lit streets in this high-octane racing game. Customize your ride, drift through corners, and dominate the leaderboards.',
            shortDescription: 'High-speed neon racing with stunning visuals.',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh86mhL2Jb_NOzG8fYKsa4md_9WjBamTgPawZAzTQA9_RK-leYgE8ZxYUTx9r1n215FKfpxEwnh2dTJTNThCvObA7WP-T967rOGbrjg3qdte7qMncNe21dC0WUGJ8pI1vzwp4fPAHHH1RbyheWZrR9XXdOnWbBnePSM_MZFaA9qeCb8swxFc7v-_IFjmepET_E8MJXg9ylOE2SJlduC6FFRCr04YM4oMVDl6bmqiXLTRnauQ0u9SGVvMgt-CbxVCaE-8eRSjck9o',
            rating: 4.5,
            ratingCount: 6200,
            downloads: 85000,
            pageViews: 210000,
            genre: 'Racing',
            categories: ['cat-3'],
            tags: ['Racing', 'Arcade', 'Multiplayer'],
            releaseDate: new Date('2024-01-20'),
            status: 'Active',
            developer: 'Speed Studios',
            versions: [
                {
                    id: 'v1', name: 'Standard', language: 'Multi',
                    updates: [{ id: 'u1', name: 'v1.5', releaseDate: new Date(), size: '25 GB', isLatest: true, cdnLinks: [{ id: 'l1', name: 'Mediafire', url: '#', provider: 'mediafire', type: 'direct' }] }]
                }
            ],
            currentVersion: 'v1.5',
            totalSize: '25 GB'
        },
        {
            id: 'space-commander',
            title: 'Space Commander',
            slug: 'space-commander',
            description: 'Lead your fleet to victory in this tactical space strategy game.',
            shortDescription: 'Tactical space strategy with deep fleet management.',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlTiRf_-eB_zFzgcQ3wLEuI16-wb2FOOKJPeIgf8IxC9dlIADs5bw86jIEhDADpT_ddeOHGzCqnq2R-X-mYSweWoCNFmd8LTFbTErnbbeAqNkIWrZOMnSNfAZLhtdFuN10kgpjHZFzS-yYbioPsKdObPenMa0WC1x6NEgLhJjvJzWb-cdn-xG9eWe5YqQl2X_TxjIWhAejWmFmnWNdl6LSLr1EvXk2ps8j2r6t1m2itTiGd0Fl3nu2HHA9vhnTk1HpqU6DY00NAaE',
            rating: 4.2,
            ratingCount: 3200,
            downloads: 45000,
            pageViews: 120000,
            genre: 'Strategy',
            categories: ['cat-4'],
            tags: ['Strategy', 'Sci-Fi', 'Turn-Based'],
            status: 'Active',
            developer: 'Tactical Games',
            versions: [
                {
                    id: 'v1', name: 'Standard', language: 'English',
                    updates: [{ id: 'u1', name: 'v2.0', releaseDate: new Date(), size: '18 GB', isLatest: true, cdnLinks: [{ id: 'l1', name: 'Mega', url: '#', provider: 'mega', type: 'direct' }] }]
                }
            ],
            currentVersion: 'v2.0',
            totalSize: '18 GB'
        },
        {
            id: 'mystery-quest',
            title: 'Mystery Quest',
            slug: 'mystery-quest',
            description: 'Unravel ancient mysteries and solve challenging puzzles in this adventure game.',
            shortDescription: 'Adventure puzzle game with stunning narratives.',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB13cVxEbNNO5J2bSV-iGxzZxPOjuxoU-1O_XS-3bYBOazlxKF6AckJeYbWIzXYzOzeEqFKKe0ICa4F6PJR0b8NBOTHPbrovZAI139s55_gpPHz0uGEMP8hsxJGgcvsVbLQStAddXVAl-3X5TNKLIMbsse8ln0pxQ0fGY2yQZrUUVV7G_uikNSV-6boAec5_e7sSSzUMbKoJ07rnSKuarOl7gGMtiWdghBXNArWlf5YQA-Sx7Qi2mAhw9iT21DAm2fl2ojtGjxpmgo',
            rating: 4.7,
            ratingCount: 2800,
            downloads: 32000,
            pageViews: 95000,
            genre: 'Adventure',
            categories: ['cat-6'],
            tags: ['Adventure', 'Puzzle', 'Story'],
            status: 'Upcoming',
            developer: 'Quest Studios',
            versions: [],
            currentVersion: 'Coming Soon',
            totalSize: 'TBA'
        },
        {
            id: 'shadows-of-the-deep',
            title: 'Shadows of the Deep',
            slug: 'shadows-of-the-deep',
            description: 'Survive the horrors lurking in the abyss in this terrifying multiplayer experience.',
            shortDescription: 'Terrifying underwater horror adventure.',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuluf04R9f5CcDBYdNH3YNir2nvrm-WEUoFncBmVZanNlcPARQt1quen1qUNC2aP9WnLCcJZ4zUgO_njR6XaoVtiTdMS09oHE-2y8Vm_Om7gxjSG3aZGHw32LFkk_xK2Fg9-S-jNNDkpI6ORDaxuv-Y1XEqNwZzOeuEyNB7LR8aoFsEg5aMN268Vb3-UPyLhsiVPFtcc79uH2WJnvEfHRmdLzNR2GwVxkAmqNSbm8Jw1We8QYvHpabi7Jhp5RuZqQUpxlqNu_C7uI',
            rating: 4.6,
            ratingCount: 1500,
            downloads: 12000,
            pageViews: 45000,
            genre: 'Horror',
            categories: ['cat-5'],
            tags: ['Horror', 'Multiplayer', 'Survival'],
            releaseDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
            status: 'Active',
            developer: 'Dark Waters Studio',
            versions: [
                {
                    id: 'v1', name: 'Standard', language: 'English',
                    updates: [{ id: 'u1', name: 'v1.0', releaseDate: new Date(), size: '35 GB', isLatest: true, cdnLinks: [{ id: 'l1', name: 'Torrent', url: '#', provider: 'torrent', type: 'torrent' }] }]
                }
            ],
            currentVersion: 'v1.0',
            totalSize: '35 GB'
        },
        {
            id: 'pixel-kingdoms',
            title: 'Pixel Kingdoms',
            slug: 'pixel-kingdoms',
            description: 'Build your pixelated empire in this charming indie strategy game.',
            shortDescription: 'Charming pixel art kingdom builder.',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXKWGNkco_im-CVyiO3bmfhdjuLIwiiPRzRNZ02Sad3_bXJu8TrJ9RmI4I0JqZfA7fKCyMiKyq7UkJzdcCfHOt3AgdzF_Wq7O6GXnYLirs3fFNHPtgKBRTAzjpbW-GHjmxVPKwv5QNY7Lc5KOLUl06nDKhlSA1YywvPwtIKmA50llMhBVG9cuGxNb8L5uP3LHh_tccCffEZEd4TBCAl-vRjAVzXjMtJerMYlIFwjpFWtaLeap1nimBfC3qu5vGCChhxO2M-xaPeUk',
            rating: 4.4,
            ratingCount: 980,
            downloads: 8000,
            pageViews: 25000,
            genre: 'Indie',
            categories: ['cat-4'],
            tags: ['Indie', 'Strategy', 'Pixel Art'],
            releaseDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
            status: 'Active',
            developer: 'Pixel Dreams',
            versions: [
                {
                    id: 'v1', name: 'Standard', language: 'Multi',
                    updates: [{ id: 'u1', name: 'v1.3', releaseDate: new Date(), size: '2 GB', isLatest: true, cdnLinks: [{ id: 'l1', name: 'Google Drive', url: '#', provider: 'gdrive', type: 'direct' }] }]
                }
            ],
            currentVersion: 'v1.3',
            totalSize: '2 GB'
        },
        {
            id: 'mech-assault-vr',
            title: 'Mech Assault VR',
            slug: 'mech-assault-vr',
            description: 'Pilot massive mechs in virtual reality. Experience unprecedented immersion in mech combat.',
            shortDescription: 'VR mech combat at its finest.',
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALBQRBwB83WI9rdiwFS_hzatgEsE5NAXjizwFNDYE7lcMMp1E-ZDiIB-zS-tm6xt9mCCYmeeYi01YwMiI79JqBTDG_jLOyVBvT2DXvJmZFyAABpX8Valog5NseYsnHCwpBWfWiHkYiMvCN40QPJJXzP9nhKGRvN_QYWtDEbQWbRLPI4UE6BrNrExXw9GkvXk0zAriLq-0lrHdbqeRQxzkXPwicogSprhUFn9T0mXIn0YqN-22Mcs7AiiVzZkdA27-TG8AYZ47queE',
            rating: 4.3,
            ratingCount: 1200,
            downloads: 15000,
            pageViews: 60000,
            genre: 'Action',
            categories: ['cat-1'],
            tags: ['VR', 'Action', 'Mech', 'Simulation'],
            releaseDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
            status: 'Active',
            developer: 'VR Dynamics',
            versions: [
                {
                    id: 'v1', name: 'VR Edition', language: 'English',
                    updates: [{ id: 'u1', name: 'v1.1', releaseDate: new Date(), size: '42 GB', isLatest: true, cdnLinks: [{ id: 'l1', name: 'Mediafire', url: '#', provider: 'mediafire', type: 'parts', partCount: 5 }] }]
                }
            ],
            currentVersion: 'v1.1',
            totalSize: '42 GB'
        }
    ];

    constructor() { }

    // === Category Methods ===

    getCategories(): Observable<Category[]> {
        return of(this.categories);
    }

    getCategoryBySlug(slug: string): Observable<Category | undefined> {
        return of(this.categories.find(c => c.slug === slug));
    }

    getCategoryById(id: string): Observable<Category | undefined> {
        return of(this.categories.find(c => c.id === id));
    }

    // === Game Methods ===

    getAllGames(): Observable<Game[]> {
        return of(this.games);
    }

    getGameById(id: string): Observable<Game | undefined> {
        return of(this.games.find(g => g.id === id || g.slug === id));
    }

    getGamesByCategory(categoryId: string): Observable<Game[]> {
        return of(this.games.filter(g => g.categories.includes(categoryId)));
    }

    getGamesByCategorySlug(slug: string): Observable<Game[]> {
        const category = this.categories.find(c => c.slug === slug);
        if (!category) return of([]);
        return of(this.games.filter(g => g.categories.includes(category.id)));
    }

    getFeaturedGame(): Observable<Game | undefined> {
        return of(this.games.find(g => g.isFeatured) || this.games[0]);
    }

    getHeroGame(): Observable<Game | undefined> {
        return this.getFeaturedGame();
    }

    getTrendingGames(limit: number = 4): Observable<Game[]> {
        return of(
            [...this.games]
                .filter(g => g.status === 'Active')
                .sort((a, b) => b.downloads - a.downloads)
                .slice(0, limit)
        );
    }

    getFreshArrivals(limit: number = 4): Observable<Game[]> {
        return of(
            [...this.games]
                .filter(g => g.status === 'Active' && g.releaseDate)
                .sort((a, b) => (b.releaseDate?.getTime() || 0) - (a.releaseDate?.getTime() || 0))
                .slice(0, limit)
        );
    }

    getLatestGames(limit: number = 10): Observable<Game[]> {
        return of(
            [...this.games]
                .sort((a, b) => (b.lastUpdated?.getTime() || 0) - (a.lastUpdated?.getTime() || 0))
                .slice(0, limit)
        );
    }

    searchGames(query: string): Observable<Game[]> {
        const lowerQuery = query.toLowerCase();
        return of(this.games.filter(g =>
            g.title.toLowerCase().includes(lowerQuery) ||
            g.genre.toLowerCase().includes(lowerQuery) ||
            g.tags?.some(t => t.toLowerCase().includes(lowerQuery)) ||
            g.developer?.toLowerCase().includes(lowerQuery)
        ));
    }

    deleteGame(id: string): Observable<boolean> {
        const index = this.games.findIndex(g => g.id === id);
        if (index !== -1) {
            this.games.splice(index, 1);
            return of(true);
        }
        return of(false);
    }

    // CRUD Methods for Categories
    addCategory(category: Partial<Category>): Observable<Category> {
        const newCategory: Category = {
            id: 'cat-' + Date.now(),
            name: category.name || '',
            slug: category.slug || '',
            icon: category.icon || 'fa-gamepad',
            color: category.color || 'bg-indigo-500', // Note: using bg- instead of text- for consistency with form
            description: category.description || '',
            image: category.image || '',
            gameCount: 0
        };
        this.categories.push(newCategory);
        return of(newCategory);
    }

    updateCategory(id: string, category: Partial<Category>): Observable<Category | undefined> {
        const index = this.categories.findIndex(c => c.id === id);
        if (index !== -1) {
            this.categories[index] = { ...this.categories[index], ...category };
            return of(this.categories[index]);
        }
        return of(undefined);
    }

    deleteCategory(id: string): Observable<boolean> {
        const index = this.categories.findIndex(c => c.id === id);
        if (index !== -1) {
            this.categories.splice(index, 1);
            return of(true);
        }
        return of(false);
    }



    // === Admin Stats ===

    getAdminStats(): Observable<AdminStats> {
        const totalDownloads = this.games.reduce((sum, g) => sum + g.downloads, 0);
        const totalPageViews = this.games.reduce((sum, g) => sum + (g.pageViews || 0), 0);

        return of({
            totalGames: this.games.length,
            totalDownloads,
            totalPageViews,
            uniqueVisitors: Math.floor(totalPageViews * 0.65), // Simulated 65% unique
            adRevenue: totalPageViews * 0.002, // Simulated RPM
            totalCategories: this.categories.length,
            activeGames: this.games.filter(g => g.status === 'Active').length,
            recentDownloads: Math.floor(totalDownloads * 0.05) // Simulated 5% in last 24h
        });
    }
}
