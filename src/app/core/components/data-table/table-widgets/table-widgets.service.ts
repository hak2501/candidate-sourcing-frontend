import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableWidgetsService {
  templates: any = {};

  constructor() {}
  add(name: string, ref: TemplateRef<any>) {
    this.templates[name] = ref;
  }
  get(name: string) {
    return this.templates[name];
  }
}
