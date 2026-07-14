import { Component, EventEmitter, Input, Output} from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhonePipe } from "../pipes/phone.pipe";
import { PhoneFormat } from '../../enum/Phone';
import { HoverDirective } from "../directive/hover.directive";

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhonePipe, HoverDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  phoneFormat: typeof PhoneFormat = PhoneFormat;

  onDeleteClick(): void {
    this.deleteUser.emit(this.user);
  }

}