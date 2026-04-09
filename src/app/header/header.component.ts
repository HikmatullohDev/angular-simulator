import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MessageService } from '../services/message.service';
import { INavigation } from '../../interfaces/INavigation';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  messageService: MessageService = inject(MessageService);

  readonly companyName: string = 'румтибет';
  readonly companyCategory: string = 'туризм';

  currentTime!: string;
  counter: number = 0;
  showTimer: boolean = true;

  navigationList: INavigation[] = [
    { id: 1,
      title: 'Главная',
      path: '/'
    },
    { id: 2,
      title: 'Пользователи',
      path: '/users'
    }
  ]

  constructor() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 1000);
  }

}