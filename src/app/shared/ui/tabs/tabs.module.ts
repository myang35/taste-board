import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, TabGroupComponent, TabComponent],
  exports: [TabGroupComponent, TabComponent],
})
export class TabsModule {}
