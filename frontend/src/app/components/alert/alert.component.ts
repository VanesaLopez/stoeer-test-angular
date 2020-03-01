import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {

  @Input() content: string = 'Ooops!, something is wrong.';
  @Input() type: string = 'danger';
  /**
   * Alert types:
   * - primary
   * - secondary
   * - success
   * - danger
   * - warning
   * - info
   * - light
   * - dark
   */

  constructor() { }

}
