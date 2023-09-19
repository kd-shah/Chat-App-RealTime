export class RegisterRequest {
    name!: string;
    email!: string;
    password!: string
}

export class RegisterResponse {
    message!: string;
    UserInfo!: {
        userId: string;
        name: string;
        email: string

    }
}

export class LoginRequest {
    email!: string;
    password!: string
}

export class LoginResponse {
    message!: string;
    userInfo!: {
        userId: string;
        name: string;
        email: string;
        token: string;

    }
    
}

export class MessageResponse {
    id!: number;
    senderId!: any;
    receiverId!: string;
    content!: string;
    timestamp!: string;
    isRead!: boolean;
  }
  
  export class SendMessageRequest{
    id!: number;
    requestBody! : {
        content : string
    }
}
export class EditMessageRequest{
    messageId!: number;
    requestBody!: {
        content : string;
    }
}

export class Message {
    id!: number;
    senderId!: string | null;
    receiverId!: string;
    content!: string;
    timestamp!: string;
    isEditing!: boolean;
    isRead! : boolean;
}
