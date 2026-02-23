import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardWebSocketService {

  private stompClient!: Client;
  private leaderboardSubject = new BehaviorSubject<any[]>([]);
  public leaderboard$ = this.leaderboardSubject.asObservable();

  connect(): void {

    this.stompClient = new Client({
      // brokerURL: 'ws://localhost:8080/ws-leaderboard',
      brokerURL: environment.wsUrl,
      reconnectDelay: 5000,
      debug: (str) => console.log(str)
    });

    this.stompClient.onConnect = () => {
      console.log(' Connected to WebSocket');

      this.stompClient.subscribe('/topic/leaderboard', (message) => {
        const leaderboardData = JSON.parse(message.body);
        this.leaderboardSubject.next(leaderboardData);
      });
    };

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
