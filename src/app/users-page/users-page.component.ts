import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private userService: UserService = inject(UserService);
  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  userList$: Observable<IUser[]> = this.userService.users$;
  filter$: Observable<string> = this.filterSubject.asObservable();

  filteredUsers$: Observable<IUser[]> = combineLatest([
    this.userList$,
    this.filter$
  ]).pipe(
      map(([users, filter]: [IUser[], string]) => {
        return users.filter((user: IUser) => user.name.trim().toLowerCase().includes(filter));
      })
    );

  ngOnInit(): void {
    this.userService
      .loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      )
      .subscribe();
  }

  onAddUser(user: IUser): void {
    this.userService.addUser(user);
  }

  deleteUser(user: IUser): void {
    this.userService.deleteUser(user);
  }

  onSearchChange(value: string): void {
    this.filterSubject.next(value);
  }

}