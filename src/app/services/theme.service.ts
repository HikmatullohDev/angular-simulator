import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ITheme } from '../../interfaces/ITheme';
import { Theme } from '../../enum/Theme';
import { usePreset } from '@primeuix/styled';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.initDarkMode());
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable()
    .pipe(
      tap((isDarkMode: boolean) => {
        isDarkMode ? this.element!.classList.add('app-dark') : this.element!.classList.remove('app-dark');
      })
    );

  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.initTheme());
  theme$: Observable<Theme>= this.themeSubject.asObservable()
    .pipe(
      tap((theme: Theme) => this.changeTheme(theme))
    );

  private element: HTMLElement | null = document.querySelector('html');
  private APP_MODE_KEY: string = 'app-mode';
  private APP_THEME_KEY: string = 'app-theme';

  themeOptions: ITheme[] = [
    { name: 'Lara', theme: Theme.LARA },
    { name: 'Aura', theme: Theme.AURA },
    { name: 'Nora', theme: Theme.NORA }
  ];

  private initDarkMode(): boolean {
    return this.localStorageService.getValue('app-mode') ?? false;
  }

  private initTheme(): Theme {
    const savedTheme: Theme | null = this.localStorageService.getValue<Theme>('app-theme');
    return savedTheme ?? Theme.LARA;
  }

  toggleDarkMode(isDarkMode: boolean): void {
    this.isDarkModeSubject.next(isDarkMode);
    this.localStorageService.setValue(this.APP_MODE_KEY, isDarkMode);
  }

  changeTheme(theme: Theme): void {
    switch(theme) {
      case Theme.LARA:
        usePreset(Lara);
        break;
      case Theme.AURA:
        usePreset(Aura);
        break;
      case Theme.NORA:
        usePreset(Nora);
        break;
    }

    this.localStorageService.setValue(this.APP_THEME_KEY, theme);
  }

}