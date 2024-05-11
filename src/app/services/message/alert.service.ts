import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AlertToast } from 'src/models/alert.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  defaultToast = 'tl-top-right';
  static titleSucces = 'Éxitoso';
  static titleInfo = 'Información';
  static titleWarn = 'Advertencia';
  static titleError = 'Error';

  constructor(private messageService: MessageService) {}

  /**
   * Muestra un mensaje de éxito.
   * @param alertToast La configuración del mensaje.
   */
  showSuccessMessage(alertToast: AlertToast) {
    this.messageService.add({
      key: alertToast.key ?? this.defaultToast,
      severity: 'success',
      summary: alertToast.title,
      detail: alertToast.message,
      life: alertToast.time,
    });
  }

  /**
   * Muestra un mensaje de información.
   * @param alertToast La configuración del mensaje.
   */
  showInfoMessage(alertToast: AlertToast) {
    this.messageService.add({
      key: alertToast.key ?? this.defaultToast,
      severity: 'info',
      summary: alertToast.title,
      detail: alertToast.message,
      life: alertToast.time,
    });
  }

  /**
   * Muestra un mensaje de advertencia.
   * @param alertToast La configuración del mensaje.
   */
  showWarnMessage(alertToast: AlertToast) {
    this.messageService.add({
      key: alertToast.key ?? this.defaultToast,
      severity: 'warn',
      summary: alertToast.title,
      detail: alertToast.message,
      life: alertToast.time,
    });
  }

  /**
   * Muestra un mensaje de error.
   * @param alertToast La configuración del mensaje.
   */
  showErrorMessage(alertToast: AlertToast) {
    this.messageService.add({
      key: alertToast.key ?? this.defaultToast,
      severity: 'error',
      summary: alertToast.title,
      detail: alertToast.message,
      life: alertToast.time,
    });
  }

  /**
   * Obtiene la instancia del servicio de mensajes.
   * @returns La instancia del servicio de mensajes.
   */
  getMessageService() {
    return this.messageService;
  }
}
