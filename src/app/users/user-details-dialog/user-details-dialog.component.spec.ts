import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsDialogComponent } from './user-details-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/activated-route.stub';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersService } from '../../shared/services/users.service';
import { of } from 'rxjs';
import { UsersComponent } from '../users.component';

describe('UserDetailsDialogComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let activatedRouteStub: ActivatedRouteStub;
  let component: UserDetailsDialogComponent;
  let fixture: ComponentFixture<UserDetailsDialogComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async(() => {
    usersServiceSpy = jasmine.createSpyObj('UsersService', [ 'getUser' ]);
    matDialogSpy = jasmine.createSpyObj('MatDialog', [ 'open' ]);
    activatedRouteStub = new ActivatedRouteStub({ id: 1 });
    TestBed.configureTestingModule({
             imports: [
               HttpClientTestingModule,
               RouterTestingModule.withRoutes([{ path: 'users', component: UsersComponent }]),
             ],
             declarations: [ UserDetailsDialogComponent ],
             providers: [
               {
                 provide: ActivatedRoute,
                 useValue: activatedRouteStub,
               },
               {
                 provide: MatDialog,
                 useValue: matDialogSpy,
               },
               {
                 provide: UsersService,
                 useValue: usersServiceSpy,
               },
             ],
             schemas: [ NO_ERRORS_SCHEMA ],
           })
           .compileComponents();
  }));

  beforeEach(async(() => {
    activatedRouteStub.setParamMap({ id: 1 });
    matDialogSpy.open.and.returnValue({ afterClosed: () => of(null) } as any);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    usersServiceSpy.getUser.and.returnValue(of({} as any));
    fixture = TestBed.createComponent(UserDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get user from users service', () => {
      expect(usersServiceSpy.getUser)
        .toHaveBeenCalledWith(1);
    });
    it('should open dialog', () => {
      expect(matDialogSpy.open)
        .toHaveBeenCalled();
    });
  });
});
