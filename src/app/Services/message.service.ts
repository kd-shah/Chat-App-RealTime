import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageResponse } from './model';
import { SendMessageRequest } from './model';
import { EditMessageRequest } from './model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl: string = "https://localhost:7218/api/"

  constructor(private http: HttpClient) { }


  getMessages(userId: string, beforeTimestamp?: string | null) {

    let url = `${this.baseUrl}messages?userId=${userId}`;
    if (beforeTimestamp) {
      url += `&before=${beforeTimestamp}`;
    }
    return this.http.get<MessageResponse[]>(url);
  }

  receiverId!: string;

  sendMessages(userId: string, content: string) {
    const requestBody = { content: content };
    return this.http.post<SendMessageRequest>(`${this.baseUrl}messages?receiverId=${userId}`, requestBody)
  }

  editMessage(messageId: number, content: string) {
    const requestBody = { content: content };
    return this.http.put<EditMessageRequest>(`${this.baseUrl}messages/${messageId}`, requestBody)
  }

  deleteMessage(messageId: number) {
    return this.http.delete<number>(`${this.baseUrl}messages/${messageId}`)
  }

  searchMessage(searchInput : string){
    return this.http.get<any>(`${this.baseUrl}messages/search?query=${searchInput}`)
  }
  
} 
