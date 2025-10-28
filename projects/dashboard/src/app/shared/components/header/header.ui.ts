import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.ui.html',
  styleUrl: './header.ui.scss'
})
export class HeaderUi {
  
  public color = input<'primary' | 'danger'>('primary');

}
