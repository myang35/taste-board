import { Component, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css',
})
export class TabComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  path = input<string>();
  selected = false;

  ngOnInit(): void {
    this.selected =
      this.activatedRoute.snapshot.firstChild?.url[0].path === this.path();
  }
}
