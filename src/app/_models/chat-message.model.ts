export class ChatMessageModel {
  id: number;
  date: string;
  user: string;
  message: string;
  html: string;
  fromBot: boolean;
  channelID: number;
}
