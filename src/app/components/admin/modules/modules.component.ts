import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModulesService } from 'src/app/services/admin/modules/modules.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { IModule, IModuleRequest, IPermissionModule } from 'src/models/admin/module.interface';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit {
  moduleList: IModule[] = [];
  popUpItem = 'Edición de módulo';
  isEdit = false;
  moduleId = 0;
  viewModuleKey = false;
  currentModule: IModule | null = null;
  permissionModuleList: IPermissionModule[] = [];
  routerApp = RoutesApp;

  constructor(
    private moduleService: ModulesService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private routeService: Router,
  ) {}

  formModule = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(255)]),
  });

  get formControls() {
    return this.formModule.controls;
  }

  ngOnInit(): void {
    this.getModules();
  }

  getModules() {
    this.moduleService.getModules().subscribe((response) => {
      this.moduleList = response.data;
    });
  }

  updateModule(module: IModule) {
    this.isEdit = true;
    this.moduleId = module.moduleId;
    this.formModule.controls.name.setValue(module.name);
    this.formModule.controls.description.setValue(module.description);
  }

  cleanForm() {
    this.isEdit = false;
    this.moduleId = 0;
  }

  saveModule() {
    if (this.formModule.get('name')?.invalid || this.formModule.get('description')?.invalid) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Los campos no estan diligenciados correctamente',
      });
    } else {
      const newModule: IModuleRequest = {
        name: this.formControls['name'].value || '',
        description: this.formControls['description'].value || null,
      };
      this.moduleService.updateModule(this.moduleId, newModule).subscribe({
        next: () => {
          this.getModules();
          this.cleanForm();
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

  viewModule(module: IModule) {
    this.currentModule = module;
    this.getPermissionModule();
    this.viewModuleKey = true;
  }

  getPermissionModule() {
    this.moduleService
      .getPermissionModule(this.currentModule?.moduleId || 0)
      .subscribe((response) => {
        this.permissionModuleList = response.data;
      });
  }

  redirectPermission(item: IModule) {
    localStorage.setItem('module', JSON.stringify(item));
    this.routeService.navigate([
      `${RoutesApp.MODULES}/${RoutesApp.PERMISSION_MODULE}/${item.moduleId}`,
    ]);
  }
}
