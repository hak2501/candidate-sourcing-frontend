import { Component, ViewEncapsulation } from '@angular/core';

export const PREFIX = '--color-';

@Component({
  selector: 'app-sass-helper',
  templateUrl: './sass-helper.component.html',
  styleUrls: ['./sass-helper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SassHelperComponent {
  constructor() {}

  ngAfterViewInit() {}
  // Read the custom property of body section with given name:
  readProperty(name: string): string {
    let bodyStyles = window.getComputedStyle(document.body);
    return bodyStyles.getPropertyValue(PREFIX + name);
  }
}
