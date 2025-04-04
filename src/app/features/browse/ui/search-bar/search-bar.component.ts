import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  searchForm = this.fb.group({
    query: this.fb.control(this.route.snapshot.queryParamMap.get('search')),
  });

  onSubmit() {
    const query = this.searchForm.get('query')?.value;
    this.router.navigate([], {
      queryParams: {
        search: query || undefined,
      },
      queryParamsHandling: 'merge',
    });
  }
}
