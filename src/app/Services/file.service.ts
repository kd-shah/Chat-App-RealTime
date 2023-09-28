import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl: string = "https://localhost:7218/api/"

  constructor(private http: HttpClient) { }

  sendFile(files: File[],receiverId: string,  caption: string) {
    const formData = new FormData();
    for(const file of files){
      formData.append('files', file);
    }
    formData.append('receiverId', receiverId);
    formData.append('caption', caption);
  
    return this.http.post<any>(`${this.baseUrl}file/upload`, formData);
  }

  downloadFile(fileId? : number){
    return this.http.get<any>(`${this.baseUrl}file/download?fileId=${fileId}`, {
      responseType: 'blob' as 'json' 
    });
  }

  textFilePreview(uniqueFileName? : string){
    const requestBody = { uniqueFileName: uniqueFileName };

    return this.http.get<any>(`${this.baseUrl}file/textFilePreview?uniqueFileName=${uniqueFileName}`);
  }
}
