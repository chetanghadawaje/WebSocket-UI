import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  BASE_URL = "localhost:8000"
  subject = webSocket("ws://" + this.BASE_URL +"/chat/send");

  startConncetion(){
    this.subject.subscribe()
  }

  sendToMessage(message:String){
    this.subject.next(message)
  }

  getMessage() {
    return new Promise((resolve, reject) => {
        this.subject.subscribe({
            next: msg => {
                resolve(msg);
            },
            error: err => {
                console.log(err);
                reject(err);
            },
            complete: () => {
                console.log('complete');
                reject(new Error("Connection closed unexpectedly"));
            }
        });
    });
}

  stopConnection(){
    this.subject.complete();
  }
 
}
