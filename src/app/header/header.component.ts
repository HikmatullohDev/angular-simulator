import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MessageService } from '../services/message.service';
import { INavigation } from '../../interfaces/INavigation';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../../enum/Theme';
import { faMoon, faSun, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { ToggleSwitchChangeEvent, ToggleSwitchModule, ToggleSwitch } from 'primeng/toggleswitch';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FaIconComponent, ToggleSwitch, AsyncPipe, ToggleSwitchModule, FormsModule, SelectButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  messageService: MessageService = inject(MessageService);
  themeService: ThemeService = inject(ThemeService);

  readonly companyName: string = 'румтибет';
  readonly companyCategory: string = 'туризм';

  currentTime!: string;
  counter: number = 0;
  showTimer: boolean = true;
  faMoon: IconDefinition = faMoon;
  faSun: IconDefinition = faSun;

  navigationList: INavigation[] = [
    {
      id: 1,
      title: 'Главная',
      path: '/'
    },
    {
      id: 2,
      title: 'Пользователи',
      path: '/users'
    }
  ]

  constructor() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 1000);
  }

  toggleDarkMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.toggleDarkMode(event.checked);
  }

  onButtonClick(theme: Theme): void {
    this.themeService.changeTheme(theme);
  }

}