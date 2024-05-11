import { Component, OnInit } from '@angular/core';
import { IRsCurriculumNif } from 'src/models/workflow.interface';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Role } from 'src/enums/role.enum';

@Component({
  selector: 'app-new-subcore',
  templateUrl: './new-subcore.component.html',
  styleUrls: ['./new-subcore.component.scss'],
})
export class NewSubcoreComponent implements OnInit {
  optView = 1;
  subCoreIdEdit?: number;
  curriculumNif?: IRsCurriculumNif;
  role = 0;
  roleType = Role;

  subCoreIdView = 0;
  imageSubCore = '';

  imagenes: string[] = [
    'assets/images/image-nifs/joven-sonriente-cesped.jpg',
    'assets/images/image-nifs/mujer-feliz-mar.jpg',
    'assets/images/image-nifs/alumnos-computadora-biblioteca.jpg',
    'assets/images/image-nifs/tres-modernos-arquitectos.jpg',
    'assets/images/image-nifs/estudiantes-campus-caminando.jpg',
  ];

  constructor(
    private workflowService: WorkflowService,
    private loginService: LoginService,
  ) {}

  async ngOnInit() {
    this.role = this.loginService.getRole();
    this.loadCurriculumNif();
  }

  loadCurriculumNif() {
    this.workflowService.getCurriculumNif().subscribe((response) => {
      const { data } = response;
      this.curriculumNif = data;
    });
  }

  openCreateEditSubCore(subCoreId?: number) {
    if (subCoreId) {
      this.subCoreIdEdit = subCoreId;
    } else {
      this.subCoreIdEdit = undefined;
    }
    this.optView = 2;
  }

  closeComponent() {
    this.optView = 1;
    this.subCoreIdEdit = undefined;
    this.loadCurriculumNif();
  }

  openSubCoreView(itemId: number, index: number) {
    this.subCoreIdView = itemId || 0;
    this.imageSubCore = this.imagenes[(index || 0) % this.imagenes.length];
    this.optView = 3;
  }
}
