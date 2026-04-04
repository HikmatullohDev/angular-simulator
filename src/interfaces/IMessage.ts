import { MessageType } from "../enum/Message";

export interface IMessage {
  type: MessageType;
  text: string;
}