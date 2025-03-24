import { Component, contentChildren, effect, signal } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-group',
  imports: [],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.css',
})
export class TabGroupComponent {
  tabs = contentChildren(TabComponent);
  selectedIndex = signal(0);

  constructor() {
    effect(() => {
      this.tabs().forEach((tab, i) => {
        tab.active.set(this.selectedIndex() === i);
      });
    });
  }
}
