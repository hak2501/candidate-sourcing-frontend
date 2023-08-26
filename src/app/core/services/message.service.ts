import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private _snackBar: MatSnackBar) {}

  showMessages(messages: string[], action: string, ...args: any) {
    let message = messages.reduce((prev: string, curr: string, index) => {
      return index == 0 ? curr : prev + '\n' + curr;
    });
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      panelClass: ['warn-msg'],
    });
  }
}
