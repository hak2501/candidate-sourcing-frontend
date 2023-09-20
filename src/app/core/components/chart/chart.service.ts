import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  id: number = 0;

  constructor() {}

  getId() {
    this.id = this.id + 1;
    return this.id;
  }
}
