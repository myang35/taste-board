import { Component } from '@angular/core';
import { ChangeEmailFormComponent } from './_ui/change-email-form/change-email-form.component';
import { ChangePasswordFormComponent } from './_ui/change-password-form/change-password-form.component';

@Component({
  selector: 'app-settings',
  imports: [ChangeEmailFormComponent, ChangePasswordFormComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {}
