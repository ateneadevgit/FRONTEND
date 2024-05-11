import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { Message } from 'src/models/chatbot.interface';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnDestroy {
  chatOnline = false;
  lastMessageSender = '';
  message = '';
  messages: Message[] = [];
  @ViewChild('chatBox') chatBox!: ElementRef;
  constructor(private websocketService: WebsocketService) {}

  initChat() {
    this.websocketService.connect('ws://localhost:9000').subscribe(
      (message) => {
        const lines = message.split('\n');
        for (const line of lines) {
          const obj: Message = {
            content: line.trim(),
            sender: 'server',
          };
          this.messages.push(obj);
          if (this.chatOnline) {
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
          }
          this.lastMessageSender = obj.sender;
        }
        this.chatOnline = true;
      },
      (error) => {
        console.error('Error en la conexión WebSocket:', error);
      },
      () => {
        console.log('Conexión WebSocket cerrada');
      },
    );
  }

  sendMessage(message: string) {
    const obj: Message = {
      content: this.addLineBreaks(message),
      sender: 'user',
    };
    this.messages.push(obj);
    this.websocketService.sendMessage(message);
    this.message = '';
  }

  ngOnDestroy() {
    if (this.chatOnline) {
      this.websocketService.close();
    }
  }

  addLineBreaks(text: string): string {
    return text.replace(/(\d+\.\s)/g, '\n$1');
  }
  scrollToBottom() {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
}
