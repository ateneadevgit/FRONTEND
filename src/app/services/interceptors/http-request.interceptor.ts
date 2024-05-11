/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginService } from './../login/login.service';
import { Router } from '@angular/router';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, finalize, Observable, retry, switchMap, throwError } from 'rxjs';
import { SessionStorageItems } from 'src/enums/session-storage-items.enum';
import { CryptsService } from '../utils/crypts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoutesApp } from 'src/enums/routes.enum';
import { ITokenRefresh } from 'src/models/body.interface';
import { AlertService } from '../message/alert.service';
import { SessionMessage } from 'src/enums/session-message';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private cryptsService: CryptsService,
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
    private alertService: AlertService,
  ) {}
  /**
   * Intercepta todas las solicitudes HTTP para agregar el token de autorización y manejar errores de manera centralizada.
   * @param requestIn La solicitud HTTP entrante.
   * @param next El siguiente manejador en la cadena de interceptores.
   * @returns Un Observable que emite el evento HTTP procesado.
   */
  intercept(requestIn: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    const sessionToken = sessionStorage.getItem(SessionStorageItems.SESSION);
    let token;
    if (sessionToken) {
      token = this.cryptsService.decryptData(SessionStorageItems.SESSION);
    }
    let requestOut = requestIn;

    if (token) {
      requestOut = requestOut.clone({
        headers: requestOut.headers.set('Authorization', `${token.token}`),
      });
    }

    return next.handle(requestOut).pipe(
      retry({ count: 2, delay: 1000 }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (this.loginService.isLoggedIn()) {
            return this.handleRefreshToken(
              requestIn.clone({
                context: requestIn.context,
              }),
              next,
            );
          } else {
            this.logOutSession();
            return throwError(() => new Error('Error'));
          }
        } else if (error.status === 406) {
          if (this.loginService.isLoggedIn()) {
            this.alertService.showErrorMessage({
              title: SessionMessage.INTERFERENCE_SESSION_TITTLE,
              message: SessionMessage.INTERFERENCE_SESSION_MESSAGE,
              time: 4400,
            });
          }
          this.logOutSession();
          return throwError(() => new Error('Error'));
        } else {
          return throwError(() => new Error('Error'));
        }
      }),
      finalize(() => {
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      }),
    );
  }
  /**
   * Maneja la solicitud de actualización del token de acceso.
   * @param request La solicitud HTTP original.
   * @param next El siguiente manejador en la cadena de interceptores.
   * @returns Un Observable que emite el evento HTTP procesado.
   */
  handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    const session = this.cryptsService.decryptData(SessionStorageItems.SESSION);
    const token: ITokenRefresh = {
      token: session.token,
    };

    return this.loginService.refreshToken(token).pipe(
      switchMap((response) => {
        session.token = response.data.token;
        this.cryptsService.cryptData(SessionStorageItems.SESSION, session);
        return next.handle(
          request.clone({
            headers: request.headers.set('Authorization', `${response.data.token}`),
            context: request.context,
          }),
        );
      }),
      catchError(() => {
        if (this.loginService.isLoggedIn()) {
          this.alertService.showErrorMessage({
            title: SessionMessage.EXPIRED_SESSION_TITTLE,
            message: SessionMessage.EXPIRED_SESSION_MESSAGE,
            time: 4400,
          });
        }
        this.logOutSession();
        return throwError(() => new Error('Error'));
      }),
    );
  }
  /**
   * Cierra la sesión del usuario actual y redirige al usuario a la página de inicio de sesión.
   */
  logOutSession() {
    this.spinner.hide();
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate([RoutesApp.LOGIN]);
  }
}
