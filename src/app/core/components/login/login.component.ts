import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { errors } from './errors';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public hideRequiredControl = new FormControl(true);
  public form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }

  public activePanel: boolean = false;

  public hidePassword: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private spinnerService: SpinnerService
  ) {}

  login() {
    if (this.form.valid) {
      const val = this.form.value;
      this.spinnerService
        .showSpinnerUntilCompleted(
          this.authService.login(val.username, val.password)
        )
        .subscribe((res: any) => {
          if (!res.validation?.success) {
            this.messageService.showMessages(['Invalid Credentials'], 'Close');
          }
          this.router.navigateByUrl('/dashboard');
        });
    }
  }

  register() {
    if (this.form.valid) {
      const val = this.form.value;
      this.authService
        .register(val.username, val.email, val.password)
        .subscribe((res) => {
          if (!res.validation.success) {
            this.messageService.showMessages(res.validation.errors, 'Close');
          }
          this.form.patchValue({
            email: res.payload.email,
          });
          this.toggleScreen();
        });
    }
  }
  getErrorMessage(type: string): string {
    return errors[type];
  }

  toggleScreen() {
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.activePanel = !this.activePanel;
    if (this.activePanel) {
      this.form.get('username')?.setValidators(Validators.required);
    } else {
      this.form.get('username')?.setValidators([]);
    }
  }
}
