import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private userService: UserService = inject(UserService);

  userList$: Observable<IUser[]> = this.userService.users$;

  ngOnInit(): void {
    this.userService
      .loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      )
      .subscribe();
  }

}