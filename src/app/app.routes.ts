import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { HomeComponent } from './pages/home/home';
import { CategoryComponent } from './pages/category/category';
import { GameDetailComponent } from './pages/game-detail/game-detail';
import { DownloadWaitingComponent } from './pages/download-waiting/download-waiting';
import { DownloadAdComponent } from './pages/download-ad/download-ad';
import { DownloadFinalComponent } from './pages/download-final/download-final';
import { AdminLoginComponent } from './pages/admin-login/admin-login';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { AdminGameLibraryComponent } from './pages/admin-game-library/admin-game-library';
import { AdminGameFormComponent } from './pages/admin-game-form/admin-game-form';
import { AdminCategoriesComponent } from './pages/admin-categories/admin-categories';
import { AdminCategoryFormComponent } from './pages/admin-category-form/admin-category-form';
import { AdminSchemaDocsComponent } from './pages/admin-schema-docs/admin-schema-docs';

import { AdminPlaceholderComponent } from './pages/admin-placeholder/admin-placeholder';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'categories', component: CategoryComponent },
            { path: 'game/:id', component: GameDetailComponent }
        ]
    },
    { path: 'download/waiting/:id', component: DownloadWaitingComponent },
    { path: 'download/ad/:id', component: DownloadAdComponent },
    { path: 'download/final/:id', component: DownloadFinalComponent },
    { path: 'admin/login', component: AdminLoginComponent },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'games', component: AdminGameLibraryComponent },
            { path: 'games/new', component: AdminGameFormComponent },
            { path: 'games/edit/:id', component: AdminGameFormComponent },
            { path: 'categories', component: AdminCategoriesComponent },
            { path: 'categories/new', component: AdminCategoryFormComponent },
            { path: 'categories/edit/:id', component: AdminCategoryFormComponent },
            { path: 'schema', component: AdminSchemaDocsComponent },
            // Placeholders
            { path: 'versions', component: AdminPlaceholderComponent },
            { path: 'links', component: AdminPlaceholderComponent },
            { path: 'comments', component: AdminPlaceholderComponent },
            { path: 'analytics', component: AdminPlaceholderComponent },
            { path: 'ads', component: AdminPlaceholderComponent },
            { path: 'logs', component: AdminPlaceholderComponent },
            { path: 'settings', component: AdminPlaceholderComponent }
        ]
    },
    { path: '**', component: NotFoundComponent }
];
