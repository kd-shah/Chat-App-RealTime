export class MessageResponse {
    id!: number;
    senderId!: string;
    receiverId!: string;
    content!: string;
    timestamp!: string;
    isRead!: boolean;
    isFile! : boolean;
    attachedFiles? : [{
        fileId? : number;
        fileName? : string;
        fileSize? : number;
        caption? : string;
        contentType? : string
        filePath? : string
        uniqueFileName? : string
    }]

    
}


export class Message {
    id!: number;
    senderId!: string | null;
    receiverId!: string;
    content!: string;
    timestamp!: string;
    isEditing!: boolean;
    isRead! : boolean;
    isFile! : boolean;
    attachedFiles? : [{
        fileId? : number;
        fileName? : string;
        fileSize? : number;
        caption? : string;
        contentType? : string
        filePath? : string
        uniqueFileName? : string
    }]
}

export class File{
    name! : string;
    size! : number;
    type! : string
}