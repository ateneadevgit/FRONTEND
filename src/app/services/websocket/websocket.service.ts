/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: WebSocket;
  /**
   * Establece una conexión WebSocket con el servidor.
   * @param url La URL del servidor WebSocket.
   * @returns Una Observable que emite eventos cuando se reciben mensajes, errores o la conexión se cierra.
   */
  connect(url: string): Observable<any> {
    this.socket = new WebSocket(url);

    return new Observable((observer) => {
      this.socket.onmessage = (event) => {
        observer.next(event.data);
      };

      this.socket.onerror = (error) => {
        observer.error(error);
      };

      this.socket.onclose = () => {
        observer.complete();
      };
    });
  }
  /**
   * Envía un mensaje al servidor WebSocket.
   * @param message El mensaje a enviar.
   */
  sendMessage(message: string) {
    this.socket.send(message);
  }
  /**
   * Cierra la conexión WebSocket.
   */
  close() {
    this.socket.close();
  }
}
