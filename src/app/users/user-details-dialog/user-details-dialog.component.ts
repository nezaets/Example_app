import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../shared/services/users.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  template: '',
})
export class UserDetailsDialogComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject();
  private dialogRef;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(paramMap => this.usersService.getUser(Number(paramMap.get('id')))),
      takeUntil(this.destroy$),
        )
        .subscribe(user => {
          this.dialogRef = this.dialog.open(UserDetailsComponent, {
            height: '250px',
            width: '500px',
            data: user,
          });

          this.dialogRef.afterClosed()
              .pipe(takeUntil(this.destroy$))
              .subscribe(() => this.router.navigate([ 'users' ]));
        });
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }
}
