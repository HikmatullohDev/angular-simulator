import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent{

  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  private destroyRef: DestroyRef = inject(DestroyRef);

  filterForm: FormControl<string> = new FormControl<string>('', {nonNullable: true});

  ngOnInit() {
    this.filterForm.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap((value: string) => this.searchChange.emit(value.toLowerCase().trim())),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }
}
