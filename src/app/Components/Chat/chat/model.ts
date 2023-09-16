export class MessageResponse {
    id!: number;
    senderId!: string;
    receiverId!: string;
    content!: string;
    timestamp!: string;
}


export class Message {
    id!: number;
    senderId!: string | null;
    receiverId!: string;
    content!: string;
    timestamp!: string;
    isEditing!: boolean;
}
