import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-sort-button',
  imports: [AsyncPipe],
  templateUrl: './sort-button.component.html',
  styleUrl: './sort-button.component.css',
})
export class SortButtonComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  value = input<string>();
  selected$ = this.route.queryParamMap.pipe(
    map((value) => value.get('sort') === this.value()),
  );

  onClick() {
    this.router.navigate([], {
      queryParams: { sort: this.value() },
    });
  }
}
