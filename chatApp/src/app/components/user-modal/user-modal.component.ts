import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-user-modal',
  standalone: false,
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss'
})
export class UserModalComponent {
  name: string = '';

  constructor(private dialogRef: MatDialogRef<UserModalComponent>, private chatService: ChatService) {

  }

  addName() {
    localStorage.setItem('chatName', this.name);
    this.chatService.addUser(this.name);
    this.dialogRef.close();
  }
}
