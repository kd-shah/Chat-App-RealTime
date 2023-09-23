import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl: string = "https://localhost:7218/api/"

  constructor(private http: HttpClient) { }

  sendFile(file: File, caption: string, receiverId: string) {
    const requestBody = { file: file , receiverId: receiverId, caption: caption };
    return this.http.post<any>(`${this.baseUrl}file/upload`, requestBody)
  }
}
