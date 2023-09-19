import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Components/Chat/user-list/model';
import { SignalRService } from 'src/app/Services/signal-r.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  users!: User[];

  unReadMessages!: any[];

  connection = this.signalR.getConnection();

  constructor(private user: UserService, private signalR: SignalRService) {
  }


  ngOnInit() {
    this.user.getUsers()
      .subscribe(response => {
        this.users = response;
        console.log(response);
      })

    this.user.getUnReadMessages()
      .subscribe(response => {
        console.log(response);
        this.unReadMessages = response;
      })

      this.connection.on('BroadCast', (message) => {
        this.user.getUnReadMessages()
      .subscribe(response => {
        this.unReadMessages = response;
      })

      // this.user.readMessages(this.readMessages).subscribe()
      })
  }

  getUnReadMessageCount(userId: String) {
    const userUnreadMessages = this.unReadMessages.find(item => item.senderId === userId);

    if (!userUnreadMessages || !userUnreadMessages.messages || userUnreadMessages.messages.length === 0) {
      return 0;
    }

    return userUnreadMessages.messages.length;
  }
}
