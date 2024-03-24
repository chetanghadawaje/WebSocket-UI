import { Component } from '@angular/core';
import { ChatBoxComponent } from '../../components/chat-box/chat-box.component';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatBoxComponent, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  message:String = "";
  newMessage:String = "";
  myChatData:any = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.startConncetion()
  }

  sendMessage(){
    this.chatService.sendToMessage(this.message)
    this.chatService.getMessage().then((responseMessage:any) => {
      console.log("Received message:", responseMessage);
      this.newMessage = responseMessage?.messageReplay
      this.myChatData.push({"message": this.message, "replay": this.newMessage})
    }).catch(error => {
      console.error("Error occurred:", error);
    });
    console.log(this.myChatData)
  }

  ngOnDestroy(): void {
    this.chatService.stopConnection()
  }

}
