import { signal } from '@angular/core';
import { Observable, take } from 'rxjs';

export class RequestManager<T> {
  data = signal<T | undefined>(undefined);
  error = signal<Error | null>(null);
  status = signal<'loading' | 'ready' | 'error'>('loading');

  constructor(obs: Observable<T>) {
    obs.pipe(take(1)).subscribe({
      next: (value) => {
        this.data.set(value);
        this.status.set('ready');
      },
      error: (error) => {
        this.error.set(error);
        this.status.set('error');
      },
    });
  }
}
