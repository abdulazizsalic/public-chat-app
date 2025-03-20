import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  onlineUsers: any[] = [];
  constructor(private chatService: ChatService) {
    chatService.listen('onlineUsers').subscribe(data => {
      console.log(data);
      this.onlineUsers = data;
    });
  }
}
