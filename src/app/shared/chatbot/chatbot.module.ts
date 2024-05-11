import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './chatbot.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
/**
 * El módulo WebSocket para iniciar conversaciones con chatbots proporciona una interfaz para establecer conexiones WebSocket y enviar mensajes a un servidor de chatbot. Esta implementación está diseñada para integrarse fácilmente en aplicaciones Angular y facilitar la comunicación en tiempo real con sistemas de chat.
 */
@NgModule({
  declarations: [ChatbotComponent],
  imports: [CommonModule, ButtonModule, ReactiveFormsModule, FormsModule, InputTextModule],
  exports: [ChatbotComponent],
})
export class ChatbotModule {}
