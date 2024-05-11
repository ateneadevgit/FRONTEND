import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/message/alert.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { IRoleRequest, Roleslist } from 'src/models/roles-list.interface';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  roleList: Roleslist[] = [];
  roleVisible = false;
  isEdit = false;
  popUpItem = 'Creación de rol';
  roleId = 0;

  constructor(
    private roleService: RolesService,
    private fb: FormBuilder,
    private alertService: AlertService,
  ) {}

  formRole = this.fb.group({
    roleName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(255)]),
    sinuId: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  get formControls() {
    return this.formRole.controls;
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (response) => {
        const { data } = response;
        this.roleList = data;
      },
    });
  }

  createRole() {
    if (
      this.formRole.get('roleName')?.invalid ||
      this.formRole.get('description')?.invalid ||
      this.formRole.get('sinuId')?.invalid
    ) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Los campos no estan diligenciados correctamente',
      });
    } else {
      const newRole: IRoleRequest = {
        nameRole: this.formControls['roleName'].value || '',
        description: this.formControls['description'].value || '',
        sinuId: this.formControls['sinuId'].value || '',
      };
      this.roleService.createRole(newRole).subscribe({
        next: () => {
          this.cleanForm();
          this.getRoles();
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

  openCreateRole() {
    this.roleVisible = true;
  }

  openUpdateRole(role: Roleslist) {
    this.popUpItem = 'Actualización de rol';
    this.loadRoleData(role);
    this.isEdit = true;
    this.roleVisible = true;
  }

  loadRoleData(role: Roleslist) {
    this.formRole.controls.roleName.setValue(role.nameRole);
    this.formRole.controls.description.setValue(role.description);
    this.formRole.controls.sinuId.setValue(role.sinuId);
    this.roleId = role.roleId;
  }

  updateRole() {
    if (
      this.formRole.get('roleName')?.invalid ||
      this.formRole.get('description')?.invalid ||
      this.formRole.get('sinuId')?.invalid
    ) {
      this.alertService.showErrorMessage({
        title: 'Error',
        message: 'Los campos no estan diligenciados correctamente',
      });
    } else {
      const newRole: IRoleRequest = {
        nameRole: this.formControls['roleName'].value || '',
        description: this.formControls['description'].value || '',
        sinuId: this.formControls['sinuId'].value || '',
      };
      this.roleService.updateRole(newRole, this.roleId).subscribe({
        next: () => {
          this.cleanForm();
          this.getRoles();
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

  disableEnableRole(item: Roleslist) {
    const enabled = !item.enabled ? false : true;
    this.roleService.enableDisableRole(item.roleId, enabled).subscribe({});
  }

  cleanForm() {
    this.formRole.controls.roleName.setValue('');
    this.formRole.controls.description.setValue('');
    this.formRole.controls.sinuId.setValue('');
    this.popUpItem = 'Creación de rol';
    this.isEdit = false;
    this.roleVisible = false;
    this.roleId = 0;
  }
}
