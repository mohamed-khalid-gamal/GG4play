import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-countdown-timer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './countdown-timer.html',
    styleUrl: './countdown-timer.css'
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
    @Input() seconds: number = 10;
    @Input() autoStart: boolean = true;
    @Input() showProgress: boolean = true;
    @Input() statusText: string = 'Scanning for malware...';

    @Output() onComplete = new EventEmitter<void>();
    @Output() onTick = new EventEmitter<number>();

    // Reactive state
    remainingSeconds = signal(0);
    isRunning = signal(false);

    // Computed values
    progress = computed(() => {
        if (this.seconds === 0) return 100;
        return ((this.seconds - this.remainingSeconds()) / this.seconds) * 100;
    });

    private intervalId: any = null;

    ngOnInit(): void {
        this.remainingSeconds.set(this.seconds);
        if (this.autoStart) {
            this.start();
        }
    }

    ngOnDestroy(): void {
        this.stop();
    }

    start(): void {
        if (this.isRunning()) return;

        this.isRunning.set(true);
        this.intervalId = setInterval(() => {
            const current = this.remainingSeconds();
            if (current <= 1) {
                this.remainingSeconds.set(0);
                this.stop();
                this.onComplete.emit();
            } else {
                this.remainingSeconds.update(v => v - 1);
                this.onTick.emit(this.remainingSeconds());
            }
        }, 1000);
    }

    stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning.set(false);
    }

    reset(): void {
        this.stop();
        this.remainingSeconds.set(this.seconds);
    }

    restart(): void {
        this.reset();
        this.start();
    }
}
