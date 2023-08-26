import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss'],
})
export class NavbarMobileComponent {
  activeItem: number = 3;
  position: number = 0;
  subject$ = new BehaviorSubject('50%');
  currentPosition$ = this.subject$.asObservable();

  public animate(event: any, itemNumber: number) {
    let margin: number = 37;

    if (
      event.target.offsetParent.tagName == 'A' &&
      itemNumber != this.activeItem
    ) {
      this.activeItem = itemNumber;
      this.subject$.next(event.target.offsetParent.offsetLeft + margin + 'px');
    }
  }

  constructor() {}
}
