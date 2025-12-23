import { Component } from '@angular/core';
import { ChangeEmailFormComponent } from './_ui/change-email-form/change-email-form.component';
import { ChangePasswordFormComponent } from './_ui/change-password-form/change-password-form.component';
import { DeleteAccountFormComponent } from './_ui/delete-account-form/delete-account-form.component';

@Component({
  selector: 'app-settings',
  imports: [
    ChangeEmailFormComponent,
    ChangePasswordFormComponent,
    DeleteAccountFormComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {}
