import { Injectable } from '@angular/core';
import { IMessage } from '../../interfaces/IMessage';
import { MessageType } from '../../enum/Message';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messageSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messageList$: Observable<IMessage[]> = this.messageSubject.asObservable();

  private addMessage(type: MessageType, text: string): void {
    const newMessage: IMessage = { type, text };
    this.messageSubject.next([newMessage, ...this.messageSubject.getValue()]);

    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }

  showWarn(text: string): void {
    this.addMessage(MessageType.WARN, text);
  }

  showError(text: string): void {
    this.addMessage(MessageType.ERROR, text);
  }

  showSuccess(text: string): void {
    this.addMessage(MessageType.SUCCESS, text);
  }

  showInfo(text: string): void {
    this.addMessage(MessageType.INFO, text);
  }

  closeMessage(currentMessage: IMessage): void {
    this.messageSubject.next(this.messageSubject.getValue().filter((message: IMessage) => message !== currentMessage));
  }

}