import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../shared/services/users.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  templateUrl: './user-details-dialog.component.html',
  styleUrls: [ './user-details-dialog.component.scss']
})
export class UserDetailsDialogComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject();
  private dialogRef;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((param) => this.usersService.getUser(param.id)),
      takeUntil(this.destroy$)
    ).subscribe((user) => {
      this.dialogRef = this.dialog.open(UserDetailsComponent, {
        height: '250px',
        width: '500px',
        data: user
      });

      this.dialogRef.afterClosed().subscribe(() => this.router.navigate(['users']));
    });
  }


  public ngOnDestroy() {
    this.destroy$.next();
  }
}
