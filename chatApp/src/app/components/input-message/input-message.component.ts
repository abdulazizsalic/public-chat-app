import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-input-message',
  standalone: false,
  templateUrl: './input-message.component.html',
  styleUrl: './input-message.component.scss'
})
export class InputMessageComponent {
  message: string = '';
  constructor(private chatService: ChatService) {

  }

  sendMessage() {
    console.log('message: ', this.message);
    this.chatService.sendMessage(this.message);
    this.message = ''
  }
}
