import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { IUser } from '../../interfaces/IUser';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { UserApiService } from './user-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
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