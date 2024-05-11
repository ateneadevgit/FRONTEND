/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertService } from 'src/app/services/message/alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatalogsByIdResponse } from 'src/models/catalogs.interface';
/**
 * Servicio utilitario con funciones de uso común.
 */
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) {}

  /**
   * Obtiene la parte base64 de una imagen codificada en base64.
   * @param image La imagen codificada en base64.
   * @returns La parte base64 de la imagen.
   */
  getBase64File(image: string) {
    const splitFile = image.split(',');
    return splitFile[1];
  }
  /**
   * Obtiene la extensión de un archivo a partir de una imagen codificada en base64.
   * @param image La imagen codificada en base64.
   * @returns La extensión del archivo.
   */
  getBase64FileExtension(image: string) {
    const splitFile = image.split(';');
    const splitFileExtension = splitFile[0].split('/');
    let extension = '';
    if (splitFileExtension[1] === 'vnd.openxmlformats-officedocument.wordprocessingml.document') {
      extension = 'doc';
    } else {
      extension = splitFileExtension[1];
    }
    return extension;
  }

  /**
   * Obtiene la extensión de un archivo a partir de su nombre.
   * @param file El nombre del archivo.
   * @returns La extensión del archivo.
   */
  getFileExtension(file: string) {
    const substringFile = file.substring(file.length - 5);
    const splitFile = substringFile.split('.');
    return splitFile[1];
  }
  /**
   * Convierte un archivo a una cadena base64.
   * @param file El archivo a convertir.
   * @returns La cadena base64 del archivo.
   */
  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      const base64String = (<FileReader>event.target).result;
      if (base64String) {
        return base64String;
      }
      return;
    };
    reader.readAsDataURL(file);
  }
  /**
   * Transforma una fecha en formato "yyyy-mm-dd" a "mm-yyyy".
   * @param date La fecha en formato "yyyy-mm-dd".
   * @returns La fecha transformada en formato "mm-yyyy".
   */
  transformDateToDevelopmentProgram(date: string) {
    const event = date.split('-');
    return `${event[1]}-${event[0]}`;
  }

  /**
   * Transforma una fecha en formato "yyyy-mm-dd" a "-yyyy-mm-dd".
   * @param date La fecha en formato "yyyy-mm-dd".
   * @returns La fecha transformada en formato "-yyyy-mm-dd".
   */
  transformDate(date: string) {
    const event = date.split('-');
    return `-${event[0]}-${event[1]}-${event[2]}`;
  }
  /**
   * Transforma una fecha en formato "yyyy-mm-dd" a "mm/dd/yyyy".
   * @param date La fecha en formato "yyyy-mm-dd".
   * @returns La fecha transformada en formato "mm/dd/yyyy".
   */
  trasnformDateMonthDatYear(date: string) {
    const dateToConvert = new Date(date);
    return `${dateToConvert.getMonth()}/${dateToConvert.getDay()}/${dateToConvert.getFullYear()}`;
  }
  /**
   * Transforma una fecha en formato "yyyy-mm-dd" a "yyyy-mm-dd".
   * @param date La fecha en formato "yyyy-mm-dd".
   * @returns La fecha transformada en formato "yyyy-mm-dd".
   */
  transformDateyyyymmdd(date: string) {
    const fechaDesdeHTML = new Date(date);
    const year = fechaDesdeHTML.getFullYear();
    const month = ('0' + (fechaDesdeHTML.getMonth() + 1)).slice(-2);
    const day = ('0' + fechaDesdeHTML.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  /**
   * Transforma una fecha en formato "yyyy-mm-dd" a "yyyy-mm-ddThh:mm:ss.000Z".
   * @param date La fecha en formato "yyyy-mm-dd".
   * @returns La fecha transformada en formato "yyyy-mm-ddThh:mm:ss.000Z".
   */
  transformDateyyyymmddhh(date: string) {
    const fechaDesdeHTML = new Date(date);
    const year = fechaDesdeHTML.getFullYear();
    const month = ('0' + (fechaDesdeHTML.getMonth() + 1)).slice(-2);
    const day = ('0' + fechaDesdeHTML.getDate()).slice(-2);
    return `${year}-${month}-${day}T05:00:00.000Z`;
  }
  /**
   * Convierte una imagen en una cadena base64 a partir de su URL.
   * @param urlImg La URL de la imagen.
   * @param extencionImg La extensión de la imagen.
   * @returns La cadena base64 de la imagen.
   */
  convertUrlImgToBase64(urlImg: string, extencionImg: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'image/' + extencionImg,
    });
    return this.http.get(urlImg, { headers: headers, responseType: 'blob', withCredentials: true });
  }
  /**
   * Obtiene el nombre de un elemento de catálogo a partir de su identificador.
   * @param catalogs La lista de elementos de catálogo.
   * @param idCatalogItem El identificador del elemento de catálogo.
   * @returns El nombre del elemento de catálogo si se encuentra, de lo contrario devuelve '- -'.
   */
  getNameCatalogItem(catalogs: CatalogsByIdResponse[], idCatalogItem?: number) {
    const catalogItem = catalogs.find((item) => item.catalogItemId === idCatalogItem);
    if (!catalogItem) return '- -';
    return catalogItem.catalogItemName;
  }
}
