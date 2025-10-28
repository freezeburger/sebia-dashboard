import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.ui.html',
  styleUrl: './button.ui.scss'
})
export class ButtonUi {
  /**
   * The color of the button
   * Should be one of 'primary', 'danger', or 'secondary'
   * And represents the criticality of the action
   * primary: main action
   * danger: destructive action
   * secondary: less important action
   * @default 'primary'
   */
  public color = input<'primary' | 'danger' | 'secondary'>('primary');
}
