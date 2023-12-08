export interface User {
  id: string;
  name: string;
}

export interface ExtendedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

export interface Message {
  id?: string;
  text: string;
  createdAt?: Date;
  user?: User;
}

export interface HistoryItem {
  id: string;
  messages: {
    id?: string;
    text: string;
    created_at?: string;
    user?: ExtendedUser | null;
  }[];
}
