import { Injectable, signal, computed } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loadingTasks = signal<Set<string>>(new Set());

    /** Whether any loading task is active */
    readonly isLoading = computed(() => this.loadingTasks().size > 0);

    /** Start a loading task */
    startLoading(taskId: string = 'default'): void {
        this.loadingTasks.update(tasks => {
            const updated = new Set(tasks);
            updated.add(taskId);
            return updated;
        });
    }

    /** Complete a loading task */
    stopLoading(taskId: string = 'default'): void {
        this.loadingTasks.update(tasks => {
            const updated = new Set(tasks);
            updated.delete(taskId);
            return updated;
        });
    }

    /** Check if a specific task is loading */
    isTaskLoading(taskId: string): boolean {
        return this.loadingTasks().has(taskId);
    }

    /** Clear all loading tasks */
    clearAll(): void {
        this.loadingTasks.set(new Set());
    }
}
