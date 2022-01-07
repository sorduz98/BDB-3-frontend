import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject, take, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: Observable<any> = of([]);
  public loading = false;
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (users) => {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        },
        error: () => {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
    });

    this.users = this.userService.users;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
