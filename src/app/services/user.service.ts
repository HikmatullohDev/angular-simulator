import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { IUser } from '../../interfaces/IUser';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { UserApiService } from './user-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setValue('users', users)
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  deleteUser(user: IUser): void {
    const updatedUsers: IUser[] = this.getUsers().filter((u: IUser) => u.id !== user.id);
    this.setUsers(updatedUsers);
  }

  addUser(user: IUser): void {
    const currentUsers: IUser[] = this.getUsers();
    this.setUsers([...currentUsers, user]); 
  }

  loadUsers(): Observable<IUser[]> {

    const usersListStorage: IUser[] = this.localStorageService.getValue<IUser[]>('users') || [];

    if (usersListStorage && usersListStorage.length > 0) {
      return of(usersListStorage);
    }

    this.loaderService.showLoader();
    return this.userApiService.getUsers()
    .pipe(
      catchError(() => {
        this.messageService.showError('Ошибка загрузки пользователей');
        return of([]);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

}