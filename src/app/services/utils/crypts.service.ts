/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptsService {
  /**
   * Cifra los datos y los guarda en el almacenamiento de sesión.
   * @param key La clave bajo la cual se almacenarán los datos cifrados.
   * @param data Los datos a cifrar.
   */
  cryptData(key: string, data: any) {
    const crypt = CryptoJS.AES.encrypt(JSON.stringify(data), environment.cryptToken).toString();
    sessionStorage.setItem(key, crypt);
  }
  /**
   * Descifra los datos almacenados en el almacenamiento de sesión.
   * @param key La clave bajo la cual se almacenan los datos cifrados.
   * @returns Los datos descifrados.
   */
  decryptData(key: string) {
    const data = sessionStorage.getItem(key);
    if (!data) return;
    const decrypt = CryptoJS.AES.decrypt(data, environment.cryptToken).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypt);
  }

  /**
   * Elimina los datos almacenados bajo una clave específica del almacenamiento de sesión.
   * @param key La clave de los datos a eliminar.
   */
  clearListByKey(key: string) {
    sessionStorage.removeItem(key);
  }
  /**
   * Obtiene los datos almacenados bajo una clave específica del almacenamiento de sesión como una cadena.
   * @param key La clave de los datos a obtener.
   * @returns Los datos descifrados como una cadena.
   */
  getString(key: string) {
    const data = sessionStorage.getItem(key);
    if (!data) return;
    return CryptoJS.AES.decrypt(data, environment.cryptToken).toString(CryptoJS.enc.Utf8);
  }
  /**
   * Descifra una cadena de texto cifrada.
   * @param data La cadena de texto cifrada.
   * @returns La cadena de texto descifrada.
   */
  decryptString(data: any) {
    if (!data) return;
    return CryptoJS.AES.decrypt(data, environment.cryptToken).toString(CryptoJS.enc.Utf8);
  }
}
