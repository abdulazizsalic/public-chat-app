import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket = io('http://localhost:3000');
  user = new BehaviorSubject<string>('');
  users = new BehaviorSubject<any[]>([]);
  socketId: string | undefined = '';

  constructor() { 
    this.socketId = this.socket.id;
  }

  listen(eventName: string): Observable<any> {
    return new Observable(subscriber => {
      this.socket.on(eventName, data => {
        subscriber.next(data);
      })

      // Cleanup when unsubscribed
      return () => {
        this.socket.off(eventName);
      };
    });

  }

  sendMessage(message: string): void {
    this.socket.emit('message-event', { id: this.socket.id, message, user: this.user.value});
  }

  addUser(user: string): void{
    this.socket.emit('add-user', user);
  }
  
}
