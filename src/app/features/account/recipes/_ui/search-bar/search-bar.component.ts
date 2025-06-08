import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  private fb = inject(FormBuilder);

  submit = output<string>();

  searchForm = this.fb.group({
    query: this.fb.control(''),
  });

  onSubmit(e: Event) {
    e.stopPropagation();

    const query = this.searchForm.get('query')?.value ?? '';
    this.submit.emit(query);
  }
}
