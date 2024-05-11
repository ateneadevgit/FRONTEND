import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config/config.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { IParam, IParamRequest } from 'src/models/admin/params.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settingList: IParam[] = [];
  currentSetting: IParam | null = null;
  isOnEdit = false;
  onEditSetting = 0;

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private alertService: AlertService,
  ) {}

  formSettings = this.fb.group({
    description: new FormControl('', [Validators.maxLength(500)]),
    value: new FormControl('', [Validators.required, Validators.maxLength(255)]),
  });

  ngOnInit(): void {
    this.loadSettings();
  }

  get formControls() {
    return this.formSettings.controls;
  }

  loadSettings() {
    this.configService.getSettings().subscribe((response) => {
      this.settingList = response.data;
    });
  }

  changeToEdit(item: IParam) {
    this.currentSetting = item;
    this.onEditSetting = item.settingId;
    this.formSettings.controls.description.setValue(item.description);
    this.formSettings.controls.value.setValue(item.settingValue);
    this.isOnEdit = true;
  }

  discardChanges() {
    this.currentSetting = null;
    this.onEditSetting = 0;
    this.isOnEdit = false;
  }

  updateSetting(item: IParam) {
    if (this.formSettings.get('value')?.invalid || this.formSettings.get('description')?.invalid) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Los campos no estan diligenciados correctamente',
      });
    } else {
      const newSetting: IParamRequest = {
        value: this.formControls['value'].value || '',
        description: this.formControls['description'].value || '',
      };
      this.configService.updateSetting(item.settingId, newSetting).subscribe({
        next: () => {
          this.loadSettings();
          this.discardChanges();
          this.alertService.showSuccessMessage({
            message: 'Acción realizada con éxito',
          });
        },
        error: () => {
          this.alertService.showErrorMessage({
            title: 'Error',
            message: 'Inténtalo nuevamente',
          });
        },
      });
    }
  }
}
