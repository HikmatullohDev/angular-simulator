import { Component } from '@angular/core';
import "./training";
import { Color } from '../enum/Color';
import { Collection, nameCollection, numberCollection } from './collection';
import { ICard } from '../interfaces/ICard';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  readonly companyName: string = 'румтибет';
  readonly companyCategory: string = 'туризм';

  isLoading: boolean = true;
  tourLocation: string = '';
  tourDate: string = '';
  tourParticipants: number | null = null;
  currentTime: string = '';
  counter: number = 0;
  showTimer: boolean = true;
  liveInputText: string = '';

  cards: ICard[] = [
    {
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'guide-icon',
    },
    {
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'shield-icon',
    },
    {
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'price-tag-icon',
    }
  ]

  constructor() {
    this.saveLastVisit();
    this.updateVisitsCount();

    setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 1000);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  isFormValid(): boolean {
    return !!(this.tourDate && this.tourLocation && this.tourParticipants);
  }

  incrementCounter(): void {
    this.counter++;
  }
  
  decrementCounter(): void {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  toggleHeaderWidget(): void {
    this.showTimer = !this.showTimer;
  }

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  private saveLastVisit(): void {
    const now: string = new Date().toString();
    localStorage.setItem('lastVisitDate', now);
  }

  private updateVisitsCount(): void {
    const storedValue: number = Number(localStorage.getItem('visitsCount') || 0);
    localStorage.setItem('visitsCount', String(storedValue + 1));
  }
}

nameCollection.getAll();
numberCollection.replace(1, 77);