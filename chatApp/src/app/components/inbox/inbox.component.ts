import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

interface message {
  id: string,
  user: string,
  message: string
}

@Component({
  selector: 'app-inbox',
  standalone: false,
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent implements OnInit {
  messages: message[] = []
  chatId: string | undefined = '';
  user: string | undefined = '';
  constructor(private chatService: ChatService) {
    
  }

  ngOnInit() {
    
    this.chatService.listen('receive-message').subscribe((data: any) => {
      this.chatId = this.chatService.socket.id;
      console.log(this.user);
      this.messages = data;
    });
    this.chatService.user.subscribe(data => {
      this.user = data
      console.log(this.user);
    });
  }
}
