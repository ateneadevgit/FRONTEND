/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ProblemBankService } from 'src/app/services/problem-bank/problem-bank.service';
import { CatalogsEnum } from 'src/enums/catalogs.enum';
import { Role } from 'src/enums/role.enum';
import { ICatalogItem } from 'src/models/catalogs.interface';
import { ICompetence, ICreatedCompetence } from 'src/models/problem-bank.interface';

@Component({
  selector: 'app-competencies',
  templateUrl: './competencies.component.html',
  styleUrls: ['./competencies.component.scss'],
})
export class CompetenciesComponent implements OnInit {
  @Input() nif = false;
  activeItem: ICompetence | null = null;
  competenciesList: ICompetence[] = [];
  listAbility: ICatalogItem[] = [];
  visible = false;
  activeHtml = false;
  pastelColors: string[] = ['#FFF1C5', '#FFD4B6', '#B1D1F5', '#E3E3E3', '#C6FFD5'];
  colorMap: Map<number, string> = new Map();
  numberMap: Map<number, number> = new Map();
  currentColorIndex = 0;

  formCreate: FormGroup = new FormGroup({
    abilityId: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
  });

  html = '';
  role = 0;
  RoleEnum = Role;
  get formControls() {
    return this.formCreate.controls;
  }

  constructor(
    private problemService: ProblemBankService,
    private catalogsService: CatalogsService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.getRole();
    this.formCreate.reset();
    this.activeItem = null;
    this.loadAbility();
  }

  getRole() {
    this.role = this.loginService.getRole();
  }
  loadAbility() {
    this.catalogsService.getAllCatalogsByid(CatalogsEnum.ABILITY).subscribe((response) => {
      const { data } = response;
      this.listAbility = data.map((item) => {
        return {
          ...item,
          value: true,
        };
      });
      this.loadCompetencies();
    });
  }

  loadCompetencies() {
    this.problemService.getCompetences(this.nif).subscribe((response) => {
      this.competenciesList = response.data;
      this.competenciesList = this.nameAbility();
      this.groupByCategory();
    });
  }

  nameAbility() {
    return this.competenciesList.map((competence) => {
      const matchingCatalogItem = this.listAbility.find(
        (catalogItem) => catalogItem.catalogItemId === competence.categoryId,
      );

      if (matchingCatalogItem) {
        return {
          ...competence,
          categoryName: matchingCatalogItem.catalogItemName,
        };
      }

      return competence;
    });
  }

  groupByCategory() {
    this.competenciesList.sort((a, b) => a.categoryId - b.categoryId);
    let currentCategoryId: number | null = null;
    for (const competence of this.competenciesList) {
      if (currentCategoryId !== competence.categoryId) {
        competence.start = true;
        currentCategoryId = competence.categoryId;
        competence.countCategory = this.competenciesList.filter(
          (obj) => obj.categoryId === currentCategoryId,
        ).length;
      } else {
        competence.start = false;
      }
    }
  }

  createHtml($event: string) {
    this.html = $event;
  }

  createCompetencies() {
    this.formCreate.markAllAsTouched();
    if (this.formCreate.invalid) {
      return;
    }
    if (this.html == '') {
      return;
    }
    const payload: ICreatedCompetence = {
      categoryId: this.formCreate.controls['abilityId'].value.catalogItemId,
      code: this.formCreate.controls['code'].value,
      description: this.html,
      competenceId: null,
      createdBy: null,
      roleId: null,
    };
    if (!this.activeItem) {
      this.problemService.saveCompetence(payload).subscribe(() => {
        this.visible = false;
        this.ngOnInit();
      });
    } else {
      this.problemService.updateCompetence(payload, this.activeItem.competenceId).subscribe(() => {
        this.visible = false;
        this.ngOnInit();
      });
    }
  }

  activeNew() {
    this.activeHtml = false;
    this.html = '';
    this.visible = true;
    setTimeout(() => {
      this.activeHtml = true;
    }, 10);
  }

  editCompetencies(item: ICompetence) {
    this.activeHtml = false;
    const category = this.listAbility.find((obj) => obj.catalogItemId === item.categoryId);
    this.formCreate.controls['abilityId'].setValue(category);
    this.formCreate.controls['code'].setValue(item.code);
    this.html = item.description;
    this.activeItem = item;
    this.visible = true;
    setTimeout(() => {
      this.activeHtml = true;
    }, 10);
  }

  defineBackGroundColor(index: number): string {
    let colorBackgroud = '';
    if (this.colorMap.has(index)) {
      colorBackgroud = this.colorMap.get(index) || '';
    } else {
      this.colorMap.set(index, this.pastelColors[this.currentColorIndex]);
      colorBackgroud = this.colorMap.get(index) || '';
      this.currentColorIndex++;
      if (this.currentColorIndex >= 5) {
        this.currentColorIndex = 0;
      }
    }
    return colorBackgroud;
  }

  calculateRowId(item: any, index: number): number {
    let categoryId = 0;
    for (let i = 0; i < index; i++) {
      if (this.competenciesList[i].categoryName === item.categoryName) {
        categoryId++;
      }
    }
    return categoryId + 1;
  }
}
