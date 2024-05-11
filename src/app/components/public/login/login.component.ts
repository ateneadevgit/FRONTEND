import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/services/login/login.service';
import { CryptsService } from 'src/app/services/utils/crypts.service';
import { RoutesApp } from 'src/enums/routes.enum';
import { SessionStorageItems } from 'src/enums/session-storage-items.enum';
import { Login } from 'src/models/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  send = false;
  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private cryptsService: CryptsService,
    private router: Router,
  ) {
    const isLoggedIn = loginService.isLoggedIn();
    if (isLoggedIn) this.router.navigate([RoutesApp.DASHBOARD]);
  }
  get formControls() {
    return this.formLogin.controls;
  }

  login() {
    this.send = true;
    if (!this.formLogin.valid) return;
    const payload: Login = this.formLogin.value;
    this.loginService.login(payload).subscribe({
      next: (response) => {
        this.cryptsService.cryptData(SessionStorageItems.SESSION, response.data);
        this.getMenuByRol(response.data.userData.role);
      },
      error: () => {
        this.send = false;
        this.showToast('error', '', 'Usuario y/o contraseña inválidos');
      },
    });
  }

  getMenuByRol(rolId: number) {
    this.loginService.getMenuItems(rolId).subscribe({
      next: (response) => {
        this.send = false;
        this.cryptsService.cryptData(SessionStorageItems.MENU, response.data);
        this.router.navigate([RoutesApp.DASHBOARD]);
      },
      error: () => {
        this.send = false;
        this.loginService.logOut();
        this.showToast('error', '', 'Error cargando menu');
      },
    });
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
