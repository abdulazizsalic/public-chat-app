import { Component, inject, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { ChatService } from './services/chat.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'chatApp';
  users: string[] = [];

  constructor(private dialog: MatDialog, private chatService: ChatService, private snackBar: MatSnackBar) {

  }
  
  ngOnInit() {
    this.chatService.listen('receive-users').subscribe((data: any) => {
      this.users = data;
      this.chatService.users.next(data);

      const localName = localStorage.getItem('chatName') || '';
      this.chatService.user.next(localName);
      if(!localName) {
        this.dialog.open(UserModalComponent, {
          disableClose: true,
          minHeight: '200px',
          minWidth: '250px',
        });
      } else if(!this.users.includes(localName)) {
        this.chatService.addUser(localName);
      }
    });    
    this.snackBar.open(`User ${localStorage.getItem('chatName')} has joined the chat`, '', {
      panelClass: 'custom-snackbar',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
