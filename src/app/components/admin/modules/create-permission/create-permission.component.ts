/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ModulesService } from 'src/app/services/admin/modules/modules.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { IPermissionModule, IPermissionRequest } from 'src/models/admin/module.interface';
import { IModule } from 'src/models/program.interface';
import { Roleslist } from 'src/models/roles-list.interface';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.scss'],
})
export class CreatePermissionComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  currentModule: IModule | null = null;
  permissionModuleList: IPermissionModule[] = [];
  editPermissionKey = false;
  createPermissionKey = false;
  popUpTittle = 'Asociar permisos al rol';
  roleList: Roleslist[] = [];
  allRolesList: Roleslist[] = [];
  canCreate = false;
  canUpdate = false;
  canDelete = false;
  canView = false;
  roleModel: Roleslist | null = null;

  constructor(
    private moduleService: ModulesService,
    private roleService: RolesService,
    private alertService: AlertService,
  ) {}

  defaultRole: Roleslist | null = null;

  ngOnInit(): void {
    this.currentModule =
      localStorage.getItem('module')?.toString() !== undefined
        ? JSON.parse(localStorage.getItem('module')?.toString() ?? '')
        : null;
    this.breadcrumbItems = [
      { label: 'Módulos', routerLink: '/' + RoutesApp.MODULES },
      { label: this.currentModule?.name },
    ];
    this.getPermissionModule();
    this.getAllRoles();
  }

  getPermissionModule() {
    this.moduleService
      .getPermissionModule(this.currentModule?.moduleId || 0)
      .subscribe((response) => {
        this.permissionModuleList = response.data;
      });
  }

  openCreatePopUp() {
    this.getRoles();
    this.createPermissionKey = true;
  }

  getRoles() {
    this.roleService
      .getRolesWithNotPermissionInModule(this.currentModule?.moduleId || 0)
      .subscribe({
        next: (response) => {
          const { data } = response;
          this.roleList = data;
        },
      });
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (response) => {
        const { data } = response;
        this.allRolesList = data;
      },
    });
  }

  createPermission() {
    if (this.roleModel === null) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Los campos no estan diligenciados correctamente',
      });
    } else {
      const newPermission: IPermissionRequest = {
        hasWrite: this.canCreate,
        hasEdit: this.canUpdate,
        hasView: this.canView,
        hasDelete: this.canDelete,
        moduleId: this.currentModule?.moduleId || 0,
        roleId: this.roleModel.roleId || 0,
      };
      this.savePermissionModule(newPermission);
    }
  }

  savePermissionModule(newPermission: IPermissionRequest) {
    if (this.editPermissionKey) {
      this.moduleService.updatePermissionModule(newPermission).subscribe({
        next: () => {
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
    } else {
      this.moduleService.createPermissionModule(newPermission).subscribe({
        next: () => {
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

  cleanForm() {
    this.canCreate = false;
    this.canUpdate = false;
    this.canView = false;
    this.canDelete = false;
    this.roleModel = null;
    this.editPermissionKey = false;
    this.popUpTittle = 'Asociar permisos al rol';
    this.getPermissionModule();
    this.createPermissionKey = false;
  }

  updatePermission(item: IPermissionModule) {
    this.editPermissionKey = true;
    this.canCreate = item.canCreate;
    this.canUpdate = item.canUpdate;
    this.canView = item.canView;
    this.canDelete = item.canDelete;
    this.roleModel = this.allRolesList.find((role) => role.roleId === item.roleId) || null;
    this.popUpTittle = 'Editar asociación';
    this.createPermissionKey = true;
  }
}
