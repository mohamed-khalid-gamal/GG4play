import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic routes with parameters need Client rendering
  { path: 'game/:id', renderMode: RenderMode.Client },
  { path: 'download/waiting/:id', renderMode: RenderMode.Client },
  { path: 'download/ad/:id', renderMode: RenderMode.Client },
  { path: 'download/final/:id', renderMode: RenderMode.Client },
  { path: 'admin/games/edit/:id', renderMode: RenderMode.Client },
  { path: 'admin/**', renderMode: RenderMode.Client },

  // Static routes can be prerendered
  { path: '**', renderMode: RenderMode.Client }
];
