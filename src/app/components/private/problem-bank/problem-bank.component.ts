/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { Role } from 'src/enums/role.enum';
import { Program } from 'src/models/program.interface';

@Component({
  selector: 'app-problem-bank',
  templateUrl: './problem-bank.component.html',
  styleUrls: ['./problem-bank.component.scss'],
})
export class ProblemBankComponent implements OnInit {
  selectId = 0;

  programs: Program[] = [];
  idProgram!: number | null;
  activeEditProgram = false;

  role = 0;
  RoleEnum = Role;
  formCurricularMonitoring: FormGroup = new FormGroup({
    programOpt: new FormControl('', [Validators.required]),
  });

  constructor(
    private programsService: ProgramsService,
    private alertService: AlertService,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.getRole();
    await this.getPrograms();

    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const idProgram = params.get('id') ? Number(params.get('id')) : null;
        const program = this.programs.find((item) => item.idProgram === idProgram);
        this.formControls['programOpt']?.setValue(program);
      }
    });
  }

  getRole() {
    this.role = this.loginService.getRole();
  }

  selectProgram() {
    this.idProgram = null;
    setTimeout(() => {
      if (this.formControls['programOpt'].value) {
        this.idProgram = this.formControls['programOpt'].value.idProgram;
      }
    }, 10);
  }

  get formControls() {
    return this.formCurricularMonitoring.controls;
  }

  async getPrograms() {
    const data = (await lastValueFrom(this.programsService.getPrograms())).data;
    if (data.length === 0) {
      this.alertService.showInfoMessage({ message: 'No se encontraron programas' });
      return;
    }
    this.programs = data;
  }

  onTabChange(event: any) {
    const index = event.index;
    this.selectId = index;
  }
}
