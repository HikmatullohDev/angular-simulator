import { Component } from '@angular/core';
import "./training";
import { Color } from '../enum/Color';
import { Collection, nameCollection, numberCollection } from './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  companyName: string = 'румтибет';
  companyCategory: string = 'туризм';

  constructor() {
    this.saveLastVisit();
    this.updateVisitsCount();
  }

  isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color)
  }

  saveLastVisit(): void {
    const now: string = new Date().toString();
    localStorage.setItem('lastVisitDate', now);
  }

  updateVisitsCount(): void {
    const storedValue = Number(localStorage.getItem('visitsCount') || '0');
    localStorage.setItem('visitsCount', String(storedValue + 1));
  }

}

nameCollection.getAll();
numberCollection.replace(1, 77);